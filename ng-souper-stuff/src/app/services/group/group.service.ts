import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {GROUPID_SESSIONKEY} from '../auth/souper-auth.service';
import {Observable} from 'rxjs';
import {Tag} from './tag';

@Injectable({providedIn: 'root'})
export class GroupService {

  currentGroup$: Observable<any>;
  currentGroupTags$: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    const groupId = localStorage.getItem(GROUPID_SESSIONKEY);
    this.currentGroup$ = this.firestore.doc(`groups/${groupId}`).valueChanges();
    this.currentGroupTags$ = this.firestore.collection(`groups/${groupId}/tags`).valueChanges();
  }

  getGroup(): Observable<any> {
    return this.currentGroup$;
  }

  getGroupTags(): Observable<any> {
    return this.currentGroupTags$;
  }
}
