import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { SocialType } from '../enums/social-media.enum';
import { UserInterface } from '../interfaces/user.interface';
import { SnackbarService } from './snackbar.service';
import { OrderService } from './order.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUser: UserInterface;
  public user: Observable<UserInterface>;

  constructor(
    private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore,
    private snackbarService: SnackbarService,
    private router: Router,
    private orderService: OrderService
  ) {
    this.user = this.followUserChanges();
  }

  private followUserChanges(): Observable<UserInterface> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afFirestore.doc(`userList/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public getLocalUser(): UserInterface {
    return JSON.parse(localStorage.getItem('user'));
  }

  public login(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then( user => {
        this.afFirestore.collection('userList').ref.where('userId', '==', user.user.uid)
          .onSnapshot(snap => {
            snap.forEach(userRef => {
              this.currentUser = userRef.data() as UserInterface;
              localStorage.setItem('user', JSON.stringify(this.currentUser));
              this.router.navigateByUrl('');
            });
          });
      })
      .catch( () => this.snackbarService.snackMessage('Such user does not exist', false) );
  }

  async loginWith(social: SocialType): Promise<void> {
    let provider: firebase.default.auth.AuthProvider;
    switch (social) {
      case 'facebook':
        provider = new firebase.default.auth.FacebookAuthProvider();
        break;
      case 'google':
        provider = new firebase.default.auth.GoogleAuthProvider();
    }
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigateByUrl('');
    console.log(credential.user);
    return this.updateUserData(credential.user);
  }

  async singOut(): Promise<void> {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    await this.router.navigateByUrl('');
    this.orderService.removeAllProductsFromLocalStorage();
  }

  private updateUserData(user: firebase.default.User): Promise<void> {
    const userRef: AngularFirestoreDocument<UserInterface> = this.afFirestore.doc(`userList/${user.uid}`);
    const userData = {
      userId: user.uid,
      email: user.email,
      displayName: user.displayName
    };
    localStorage.setItem('user', JSON.stringify(userData));
    return userRef.set(userData, {merge: true});
  }
}
