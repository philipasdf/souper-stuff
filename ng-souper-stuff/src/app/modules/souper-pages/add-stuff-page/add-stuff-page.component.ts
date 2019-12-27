import {Component, OnInit} from '@angular/core';
import {Stuff} from '../../../services/stuff/stuff';
import {StuffService} from '../../../services/stuff/stuff.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {GroupService} from '../../../services/group/group.service';
import {StuffImg} from '../../../services/images/stuff-img';
import {SliderImg} from '../../souper-images/souper-images-slider-editor/slider-img';
import {ImgService} from '../../../services/images/img.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize, tap} from 'rxjs/operators';
import {snapshotChanges} from '@angular/fire/database';

@Component({
  selector: 'app-add-stuff-page',
  templateUrl: './add-stuff-page.component.html',
  styleUrls: ['./add-stuff-page.component.css']
})
export class AddStuffPageComponent implements OnInit {

  editMode = false;
  stuff: Stuff = {
    active: true,
    name: '',
    note: '',
    rating: 0,
    count: 0,
    lastUpdated: new Date(),
    tags: {},
    publicStation: '',
    street: '',
    images: []
  };

  sliderImages: SliderImg[] = [];
  selectedTags$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  // firestorage img upload
  percentage: Observable<number>;
  uploadQueue;
  uploadImgMsg: string;

  constructor(private stuffService: StuffService,
              private groupService: GroupService,
              private imgService: ImgService,
              private firestorage: AngularFireStorage,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const stuffId = this.activatedRoute.snapshot.params['id'];
    if (stuffId) {
      this.editMode = true;
      this.stuffService.getStuff(stuffId).subscribe(stuff => {

        // tags
        const tagArray: string[] = [];
        // tslint:disable-next-line:forin
        for (const key in stuff.tags) {
          tagArray.push(key);
        }
        this.selectedTags$.next(tagArray);

        if (stuff.images) {
          this.initImages(stuff.images);
        } else {
          stuff.images = [];
        }

        this.stuff = stuff;
      });
    }
  }

  getButtonName() {
    return this.editMode ? 'Save' : 'Create';
  }

  onSliderEditorOutput(images) {
    this.sliderImages = images;
  }

  onRatingsUpdated(rating) {
    this.stuff.rating = rating;
  }

  onSubmit() {
    // reset images
    const oldImages: StuffImg[] = this.stuff.images;
    this.stuff.images = [];
    // upload images
    this.uploadQueue = new BehaviorSubject<number>(0);
    this.uploadQueue.subscribe(index => {
      console.log('nextindex for queue', index);
      this.uploadImgMsg = `${index}/${this.sliderImages.length}`;

      if (index < this.sliderImages.length) {
        const targetImg = this.sliderImages[index];
        if (targetImg.id) {
          this.updateImg(targetImg, index, oldImages);
        } else {
          this.uploadImg(targetImg, index);
        }
      } else {
        // upload ready, save stuff
        this.saveStuff();
      }
    });
  }

  private saveStuff() {
    const tagObject = {};
    const currentTags: string[] = this.selectedTags$.getValue();
    currentTags.forEach(tagString => tagObject[tagString] = true);
    this.stuff.tags = tagObject;

    if (this.editMode) {
      this.stuffService.updateStuff(this.stuff);
    } else {
      this.stuffService.createStuff(this.stuff);
    }
    this.groupService.createTags(currentTags);
    this.router.navigate(['main/list']);
  }

  private async initImages(images: StuffImg[]) {
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const resizedPath = await this.imgService.getImgSize500(img.path).toPromise().catch(error => {
        console.log('Img Size 500 broken, remove it', error);
      });

      this.sliderImages.push({
        id: img.path, // there is no id for firestore map so, use unique path
        index: (img.index) ? img.index : i,
        path: resizedPath || ''
      });
    }

    this.sortByIndex();
  }

  private updateImg(img: SliderImg, index: number, oldImages) {
    console.log('update existing img', img);
    // map
    const updatedImg: StuffImg = oldImages.find(old => old.path === img.id);
    updatedImg.index = img.index;
    // push
    this.stuff.images.push(updatedImg);
    this.uploadQueue.next(index + 1);
  }

  private uploadImg(img: SliderImg, index: number) {
    console.log('upload new img', img);
    const storagePath = `${new Date().getTime()}_${img.file.name}`;

    const task        = this.firestorage.upload(storagePath, img.file);
    this.percentage  = task.percentageChanges();
    const changes = task.snapshotChanges().pipe(tap(snapshot => console.log(snapshot.bytesTransferred + '/' + snapshot.totalBytes)));
    changes.pipe(
      finalize(() => {
        const result: StuffImg = {
          index: img.index,
          path: storagePath,
          fileSize: img.file.size
        };
        this.stuff.images.push(result);

        setTimeout(() => {
          this.uploadQueue.next(index + 1); }, 1500);
      })).subscribe();
  }

  private sortByIndex() {
    this.sliderImages.sort((a, b) => {
      return a.index - b.index;
    });
  }
}
