import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({providedIn: 'root'})
export class SouperSessionService {

  private readonly GROUPID_SESSIONKEY = 'souper-stuff-user-group-id';

  constructor(private router: Router,
              private fireAuth: AngularFireAuth) {
  }

  getGroupId() {
    console.log('get groupid from session', localStorage);
    const groupId = localStorage.getItem(this.GROUPID_SESSIONKEY);
    if (groupId === null || groupId === undefined || groupId === '') {
      this.fireAuth.auth.signOut();
      this.router.navigate(['info']);
    } else {
      return groupId;
    }
  }

  setGroupId(groupId: string) {
    localStorage.setItem(this.GROUPID_SESSIONKEY, `${groupId}`);
    console.log('set groupid into session', localStorage);
  }
}
