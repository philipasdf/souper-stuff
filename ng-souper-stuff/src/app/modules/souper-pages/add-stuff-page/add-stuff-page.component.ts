import {Component, OnInit} from '@angular/core';
import {Stuff} from '../../../services/stuff/stuff';
import {StuffService} from '../../../services/stuff/stuff.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {GroupService} from '../../../services/group/group.service';
import {StuffImg} from '../../../services/images/stuff-img';
import {SliderImg} from '../../souper-images/souper-images-slider-editor/slider-img';
import {ImgService} from '../../../services/images/img.service';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

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

  images: SliderImg[] = [];
  selectedTags$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  newImages: SliderImg[] = [];

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
    this.newImages = images;
  }

  onSliderEditorRemove(imgToRemove: SliderImg) {
    this.stuff.images = this.stuff.images.filter(img => img.index !== imgToRemove.index);
  }

  onRatingsUpdated(rating) {
    this.stuff.rating = rating;
  }

  onSubmit() {
    // upload photos
    this.uploadQueue = new BehaviorSubject<number>(0);
    this.uploadQueue.subscribe(index => {
      console.log('nextindex for queue', index);
      this.uploadImgMsg = `${index}/${this.newImages.length}`;

      if (index < this.newImages.length) {
        const targetImg = this.newImages[index];
        console.log('upload this img', targetImg);
        if (targetImg.file) {
          console.log('img is new', targetImg);
          this.uploadImg(targetImg, index);
        } else {
          this.uploadQueue.next(index + 1);
        }
      } else {
        console.log('images are ready now save this stuff', this.stuff);
        // upload done
        this.saveStuff();
      }
    });
  }

  private saveStuff() {
    const tagObject = {};
    const currentTags: string[] = this.selectedTags$.getValue();
    currentTags.forEach(tagString => tagObject[tagString] = true);

    this.stuff.tags = tagObject;
    console.log(this.stuff);

    if (this.editMode) {
      console.log('update lets go');
      this.stuffService.updateStuff(this.stuff);
    } else {
      console.log('create lets go');
      this.stuffService.createStuff(this.stuff);
    }
    this.groupService.createTags(currentTags);
    this.router.navigate(['main/list']);
  }

  private async initImages(images: StuffImg[]) {
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const resizedPath = await this.imgService.getImgSize500(img.path).toPromise();

      this.images.push({
        index: (img.index) ? img.index : i,
        path: resizedPath
      });
    }

    this.sortByIndex();
  }

  private uploadImg(img: SliderImg, index: number) {
    const storagePath = `${new Date().getTime()}_${img.file.name}`;

    const task        = this.firestorage.upload(storagePath, img.file);
    this.percentage  = task.percentageChanges();
    task.snapshotChanges().subscribe(snapshot => {
      console.log(snapshot);
      console.log(snapshot.bytesTransferred);
      console.log(snapshot.totalBytes);
      if (snapshot.bytesTransferred === snapshot.totalBytes) {
        const result: StuffImg = {
            index: img.index,
            path: storagePath,
            fileSize: img.file.size
          };

        this.stuff.images.push(result);
        console.log(this.stuff.images);
        this.sortByIndex();

        setTimeout(() => { this.uploadQueue.next(index + 1); }, 1500);
      }
    });
  }

  private sortByIndex() {
    this.images.sort((a, b) => {
      return a.index - b.index;
    });
  }
}
