import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference} from '@angular/fire/firestore';
import {Stuff} from './stuff';
import {Observable, of, Subject} from 'rxjs';
import {GROUPID_SESSIONKEY, SouperAuthService} from '../auth/souper-auth.service';
import {switchMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class StuffService {

  stuffs$: Observable<any[]>;
  searchTags$ = new Subject<string[]>();

  firestorePath: string;

  constructor(private firestore: AngularFirestore, private authService: SouperAuthService) {
    const groupId = localStorage.getItem(GROUPID_SESSIONKEY);
    this.firestorePath = `stuffs/${groupId}/groupStuffs`;

    this.stuffs$ = this.searchTags$.pipe(
      switchMap((tags: string[]) => {
          if (tags.length > 0) {
            return this.firestore.collection(this.firestorePath, (ref) => {

              let query = ref.where('active', '==', true); // workaround to get query object from ref

              tags.forEach(tag => {
                query = query.where(`tags.${tag}`, '==', true); // because cannot query multiple array-contains
              });
              return query;

            }).valueChanges();
          } else {
            return of([]);
          }
        }
      ));
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
    });
  }

  filterStuffsByTags(tags: string[]) {
    this.searchTags$.next(tags);
  }
}
