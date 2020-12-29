import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { switchMap } from 'rxjs/operators';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUser: any;
  public user: Observable<UserInterface>;

  constructor(
    private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore,
    private snackbarService: SnackbarService
  ) {
    this.user = this.afAuth.authState.pipe(
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
        this.afFirestore.collection('userList').ref.where('uid', '==', user.user.uid)
          .onSnapshot(snap => {
            snap.forEach(userRef => {
              this.currentUser = userRef.data();
              localStorage.setItem('user', JSON.stringify(this.currentUser));
            });
          });
      })
      .catch( () => this.snackbarService.snackMessage('Such user does not exist', false) );
  }

  async loginWith(social: string): Promise<void> {
    if (social === 'facebook') {
      const provider = new firebase.default.auth.FacebookAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    } else {
      const provider = new firebase.default.auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    }
  }

  private updateUserData(user: UserInterface): Promise<void> {
    const userRef: AngularFirestoreDocument<UserInterface> = this.afFirestore.doc(`userList/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
    localStorage.setItem('user', JSON.stringify(userData));
    return userRef.set(userData, {merge: true});
  }

  async singOut(): Promise<void> {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
  }
}
