import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference} from '@angular/fire/firestore';
import {Stuff} from './stuff';
import {Observable, of, Subject} from 'rxjs';
import {SouperAuthService} from '../auth/souper-auth.service';
import {User} from '../auth/user';
import {switchMap, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class StuffService {

  stuffsCollection: AngularFirestoreCollection<Stuff>;
  stuffs$: Observable<any[]>;
  searchTags$ = new Subject<string[]>();

  currentGroupId: string;

  constructor(private firestore: AngularFirestore, private authService: SouperAuthService) {
    this.initUserGroupStuffs();
  }

  private async initUserGroupStuffs() {
    const user: User = await this.authService.user$.pipe(take(1)).toPromise();
    this.currentGroupId = user.groupId;


    this.stuffs$ = this.searchTags$.pipe(
      switchMap((tags: string[]) => {
        if (tags.length > 0) {
          return this.firestore.collection(`stuffs/${this.currentGroupId}/groupStuffs`, (ref) => {

            let query = ref.where('active', '==', true); // workaround to get query object from ref

            tags.forEach(tag => {
              query = query.where(`tags.${tag}`, '==', true);
            });
            return query;

          }).valueChanges();
        } else {
          return of([]);
        }
      }
    ));

    this.filterStuffsByTags([]);
  }

  createStuff(stuff: Stuff) {
    this.firestore.collection(`stuffs/${this.currentGroupId}/groupStuffs`).add(stuff).then(docRef => {
      console.log('new stuff was added to collection');
    }).catch(error => {
      console.error('error when adding new stuff to collection', stuff);
    });
  }

  filterStuffsByTags(tags: string[]) {
    this.searchTags$.next(tags);
  }
}
