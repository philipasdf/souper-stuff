import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Stuff} from './stuff';
import {Observable} from 'rxjs';
import {SouperAuthService} from '../auth/souper-auth.service';
import {User} from '../auth/user';
import {take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class StuffService {

  stuffsCollection: AngularFirestoreCollection<Stuff>;
  stuffs: Observable<Stuff[]>;

  currentGroupId: string;

  constructor(private firestore: AngularFirestore, private authService: SouperAuthService) {
    this.initUserGroupStuffs();
  }

  private async initUserGroupStuffs() {
    const user: User = await this.authService.user$.pipe(take(1)).toPromise();
    this.currentGroupId = user.groupId;

    this.stuffsCollection = await this.firestore.collection(`stuffs/${this.currentGroupId}/groupStuffs`, ref => {
      return ref.orderBy('name', 'asc');
      // return ref.orderBy('name', 'asc').where('rating', '==', 5).where('count', '==', 1);
      // doesnt work with > operator, would need new index
    }); // reference
    this.stuffs = this.stuffsCollection.valueChanges(); // observable of data
  }

  createStuff(stuff: Stuff) {
    this.firestore.collection(`stuffs/${this.currentGroupId}/groupStuffs`).add(stuff).then(docRef => {
      console.log('new stuff was added to collection');
    }).catch(error => {
      console.error('error when adding new stuff to collection', stuff);
    });
  }
}
