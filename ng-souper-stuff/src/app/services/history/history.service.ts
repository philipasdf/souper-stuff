import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {SouperSessionService} from '../session/souper-session.service';
import {History} from './history';
import {StuffService} from '../stuff/stuff.service';
import {Stuff} from '../stuff/stuff';

@Injectable({providedIn: 'root'})
export class HistoryService {

  history$: Observable<any[]>;

  firestorePath: string;

  constructor(private firestore: AngularFirestore, private stuffService: StuffService, private sessionService: SouperSessionService) {
    const groupId = this.sessionService.getGroupId();
    this.firestorePath = `history/${groupId}/groupHistory`;


    this.history$ = this.firestore.collection(this.firestorePath, (ref) => {

      // TODO configurable date range
      // let query = ref.where('active', '==', true);
      // query = query.limit(20);

      return ref;

    }).valueChanges();
  }

  createHistory(stuff: Stuff, history: History) {
    history.historyId = this.firestore.createId();
    const stuffRef: AngularFirestoreDocument<History> = this.firestore.doc(this.firestorePath + `/${history.historyId}`);

    if (stuff.history) {
      stuff.history.push(history);
    } else {
      stuff.history = [history];
    }
    stuff.lastUpdated = history.date;
    
    this.stuffService.updateStuff(stuff);

    stuffRef.set(history).then(() => {
      console.log('new history was added to collection');
    }).catch(error => {
      console.error('error when adding new history to collection', error);
    });
  }

  updateHistory(stuff: Stuff, history: History) {

    stuff.history = stuff.history.map(h => {
      if (h.historyId === history.historyId) {
        h = history;
      }
      return h;
    });
    this.stuffService.updateStuff(stuff);

    const stuffRef: AngularFirestoreDocument<History> = this.firestore.doc(this.firestorePath + `/${history.historyId}`);
    stuffRef.update(history).then(docRef => {
      console.log('history was updated');
    }).catch(error => {
      console.error('error when updating history', history);
      console.error(error);
    });
  }
}
