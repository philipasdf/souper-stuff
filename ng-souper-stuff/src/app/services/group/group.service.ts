import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {GROUPID_SESSIONKEY} from '../auth/souper-auth.service';
import {Observable} from 'rxjs';
import {Tag} from './tag';

@Injectable({providedIn: 'root'})
export class GroupService {

  currentGroup$: Observable<any>;
  currentGroupTags$: Observable<any[]>;

  firebasePath: string;

  constructor(private firestore: AngularFirestore) {
    const groupId = localStorage.getItem(GROUPID_SESSIONKEY);
    this.firebasePath = `groups/${groupId}`;
    this.currentGroup$ = this.firestore.doc(this.firebasePath).valueChanges();
    this.currentGroupTags$ = this.firestore.collection(this.firebasePath + `/tags`).valueChanges();
  }

  getGroup(): Observable<any> {
    return this.currentGroup$;
  }

  getGroupTags(): Observable<any> {
    return this.currentGroupTags$;
  }

  createTags(tags: string[]) {
    tags.forEach(tag => {
      const tagRef: AngularFirestoreDocument<Tag> = this.firestore.doc(this.firebasePath + `/tags/${tag}`);
      tagRef.set({name: tag}, {merge: true});
    });
  }
}
