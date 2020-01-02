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

  async createHistory(stuff: Stuff, history: History): Promise<any> {
    history.historyId = this.firestore.createId();
    const stuffRef: AngularFirestoreDocument<History> = this.firestore.doc(this.firestorePath + `/${history.historyId}`);

    return new Promise((resolve, reject) => {

      if (stuff.history) {
        stuff.history.push(history);
      } else {
        stuff.history = [history];
      }
      this.stuffService.updateStuff(stuff);

      stuffRef.set(history).then(() => {
        console.log('new history was added to collection');
        resolve(history);
      }).catch(error => {
        console.error('error when adding new history to collection', history);
        reject(error);
      });
    });
  }

  updateHistory(history: History) {
    const stuffRef: AngularFirestoreDocument<History> = this.firestore.doc(this.firestorePath + `/${history.historyId}`);
    stuffRef.update(history).then(docRef => {
      console.log('history was updated');
    }).catch(error => {
      console.error('error when updating history', history);
      console.error(error);
    });
  }
}
