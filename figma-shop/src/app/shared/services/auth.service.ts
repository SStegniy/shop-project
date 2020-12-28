import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/firebase-auth';
import { Observable, of } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;
  private user: Observable<UserInterface>;

  constructor(
    private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore
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
    this.user.subscribe(data => console.log(data));
  }

  public login(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then( user => {
        this.afFirestore.collection('userList').ref.where('id', '==', user.user.uid)
          .onSnapshot(snap => {
            snap.forEach(userRef => {
              this.currentUser = userRef.data();
              localStorage.setItem('user', JSON.stringify(this.currentUser));
            });
          });
      })
      .catch( error => console.log('No user with this email') );
  }

  public loginWithGoogle(): any {
    const provider = new auth.GoogleAuthProvider();
    const credential = this.afAuth.signInWithPopup(provider);
    credential.then(data => console.log(data));
  }
}
