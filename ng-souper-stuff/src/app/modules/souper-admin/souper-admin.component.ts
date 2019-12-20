import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Stuff} from '../../services/stuff/stuff';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-souper-admin',
  templateUrl: './souper-admin.component.html'
})
export class SouperAdminComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage) {
  }

  ngOnInit() {
  }

  deleteAllImages() {
    console.log('delete images lets go');

    // const observable = this.firestore.collection('stuffs/SYFzwshDoHYk9BC7afDH/groupStuffs').valueChanges();
    // observable.subscribe(stuffs => {
    //   console.log('stuffs', stuffs);
    //   stuffs.forEach((stuff: Stuff) => {
    //     if (stuff.images) {
    //       stuff.images = null;
    //
    //       // persist again
    //       const stuffRef: AngularFirestoreDocument<Stuff> = this.firestore.doc('stuffs/SYFzwshDoHYk9BC7afDH/groupStuffs' + `/${stuff.id}`);
    //       stuffRef.update(stuff).then(docRef => {
    //         console.log('stuff was updated');
    //       }).catch(error => {
    //         console.error('error when updating stuff', stuff);
    //         console.error(error);
    //       });
    //
    //     }
    //   });
    // });

    // job done, dont do this again lol
  }

  moveImages() {
    console.log('move images lets go');

    const observable = this.firestore.collection('stuffs/SYFzwshDoHYk9BC7afDH/groupStuffs').valueChanges();
    observable.subscribe(stuffs => {
      console.log('stuffs', stuffs);
      stuffs.forEach((stuff: Stuff) => {
        if (stuff.images) {
          // adjust path
          stuff.images = stuff.images.map(img => {
            console.log(img.path);
            img.path = this.removeFolder(img.path);
            console.log(img.path);
            return img;
          });

          // upload foto again
          // not possible, we only got urls and not the file

          // persist again



        }
      });
    });
  }

  private removeFolder(originalPath) {
    const index = 21;
    return originalPath.slice(index);
  }

}
