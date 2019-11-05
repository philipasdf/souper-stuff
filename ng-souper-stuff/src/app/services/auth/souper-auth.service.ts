import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {User} from './user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';
import { auth } from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class SouperAuthService {

  user$: Observable<User>;

  constructor(private router: Router,
              private fireAuth: AngularFireAuth,
              private firestore: AngularFirestore) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const credential = await this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.updateUserData(credential.user);
    return this.router.navigate(['main']);
  }

  async signOut() {
    await this.fireAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user) {
    const newUser = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      group: 'groups/SYFzwshDoHYk9BC7afDH'
    };

    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    return userRef.set(newUser, {merge: true});
  }
}
