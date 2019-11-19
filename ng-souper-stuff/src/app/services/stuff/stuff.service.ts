import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Stuff} from './stuff';
import {Observable, of, Subject} from 'rxjs';
import {SouperSessionService} from '../session/souper-session.service';

@Injectable({providedIn: 'root'})
export class StuffService {

  stuffs$: Observable<any[]>;
  searchTags$ = new Subject<string[]>();

  firestorePath: string;

  constructor(private firestore: AngularFirestore, private sessionService: SouperSessionService) {
    const groupId = this.sessionService.getGroupId();
    this.firestorePath = `stuffs/${groupId}/groupStuffs`;

    this.searchTags$.subscribe((tags: string[]) => {
      if (tags.length > 0) {
        this.stuffs$ = this.firestore.collection(this.firestorePath, (ref) => {

          let query = ref.where('active', '==', true); // workaround to get query object from ref

          tags.forEach(tag => {
            query = query.where(`tags.${tag}`, '==', true); // because cannot query multiple array-contains
          });
          return query;

        }).valueChanges();
      } else {
        this.stuffs$ = of([]);
      }
    });
  }

  async createStuff(stuff: Stuff) {
    stuff.id = this.firestore.createId();
    const stuffRef: AngularFirestoreDocument<Stuff> = this.firestore.doc(this.firestorePath + `/${stuff.id}`);
    stuffRef.set(stuff).then(docRef => {
      console.log('new stuff was added to collection');
    }).catch(error => {
      console.error('error when adding new stuff to collection', stuff);
    });
  }

  updateStuff(stuff: Stuff) {
    const stuffRef: AngularFirestoreDocument<Stuff> = this.firestore.doc(this.firestorePath + `/${stuff.id}`);
    stuffRef.update(stuff).then(docRef => {
      console.log('stuff was updated');
    }).catch(error => {
      console.error('error when updating stuff', stuff);
      console.error(error);
    });
  }

  filterStuffsByTags(tags: string[]) {
    this.searchTags$.next(tags);
  }
}
