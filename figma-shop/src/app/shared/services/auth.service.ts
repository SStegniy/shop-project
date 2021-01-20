import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { SocialTypeEnum } from '../enums/social-media.enum';
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

  public login(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then( user => {
        this.afFirestore.collection('userList').ref.where('userId', '==', user.user.uid)
          .onSnapshot(snap => {
            snap.forEach(userRef => {
              this.currentUser = userRef.data() as UserInterface;
              this.setUserToLocalStorage(this.currentUser);
              this.router.navigateByUrl('');
            });
          });
      })
      .catch( () => this.snackbarService.snackMessage('Such user does not exist', false) );
  }

  async loginWith(social: SocialTypeEnum): Promise<void> {
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
    return this.updateUserData(credential.user);
  }

  public signUp(name: string, email: string, password: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user = {
          userId: userResponse.user.uid,
          email: userResponse.user.email,
          displayName: name,
          image: ''
        };
        this.afFirestore.collection('userList').add(user)
          .then(() => {
            this.snackbarService.snackMessage(`Hello ${user.displayName}`, true);
            this.setUserToLocalStorage(user);
          })
          .catch(() => this.snackbarService.snackMessage('Something went wrong', false));
      });
  }

  async singOut(): Promise<void> {
    await this.afAuth.signOut();
    this.removeUserFromLocalStorage();
    await this.router.navigateByUrl('');
    this.orderService.removeOrderFromLocalStorage();
  }

  private updateUserData(user: firebase.default.User): Promise<void> {
    console.log(user);
    const userRef: AngularFirestoreDocument<UserInterface> = this.afFirestore.doc(`userList/${user.uid}`);
    const userData = {
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      image: user.photoURL
    };
    this.setUserToLocalStorage(userData);
    return userRef.set(userData, {merge: true});
  }

  public getUserFromLocalStorage(): UserInterface {
    return JSON.parse(localStorage.getItem('user'));
  }

  public setUserToLocalStorage(user: UserInterface): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public removeUserFromLocalStorage(): void {
    localStorage.removeItem('user');
  }
}
