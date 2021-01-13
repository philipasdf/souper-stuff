import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { User } from "./user";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { switchMap } from "rxjs/operators";
import * as f from "firebase";
import { SouperSessionService } from "../session/souper-session.service";

@Injectable({ providedIn: "root" })
export class SouperAuthService {
  user$: Observable<User>;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private sessionService: SouperSessionService
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    this.user$.subscribe((user) => {
      console.log("firebase user", user);
      if (user) {
        if (user.groupId === null || user.groupId === undefined) {
          user.groupId = ""; // currently I have to set it in firebase console
          this.router.navigate([`info`]);
        } else {
          this.sessionService.setGroupId(user.groupId);
          this.router.navigate([`main/list`]);
        }
      }
      console.log(localStorage);
    });
  }

  async googleSignin() {
    const credential = await this.fireAuth.auth.signInWithPopup(
      new f.auth.GoogleAuthProvider()
    );
    this.updateUserCredential(credential.user);
  }

  async signOut() {
    await this.fireAuth.auth.signOut();
    return this.router.navigate(["/"]);
  }

  private updateUserCredential(user: User) {
    const newUser = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
    };

    // TODO how can I pass groupId to other services by DI? And does it work with page reload then?
    // localStorage.setItem(GROUPID_SESSIONKEY, 'SYFzwshDoHYk9BC7afDH');

    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
      `users/${user.uid}`
    );
    userRef.set(newUser, { merge: true });
  }
}
