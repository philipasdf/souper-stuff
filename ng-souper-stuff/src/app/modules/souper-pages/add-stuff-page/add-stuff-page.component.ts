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
  editedImages: SliderImg[] = [];

  // firestorage img upload
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  uploadQueue = new BehaviorSubject<number>(0);

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
    this.editedImages = images;
  }

  onRatingsUpdated(rating) {
    this.stuff.rating = rating;
  }

  onSubmit() {
    const tagObject = {};
    const currentTags: string[] = this.selectedTags$.getValue();
    currentTags.forEach(tagString => tagObject[tagString] = true);

    this.stuff.tags = tagObject;
    console.log(this.stuff);

    // upload photos, if done
    this.uploadQueue.next(this.editedImages.length);
    this.uploadQueue.subscribe(nextIndex => {
      console.log(nextIndex);
      if (nextIndex > 0) {
        const targetImg = this.editedImages[nextIndex - 1];
        if (targetImg.file) {
          this.uploadImg(targetImg, nextIndex - 1);
        }
      } else {
        console.log(this.stuff);
        // upload done
        if (this.editMode) {
          this.stuffService.updateStuff(this.stuff);
        } else {
          this.stuffService.createStuff(this.stuff);
        }
        this.groupService.createTags(currentTags);
        this.router.navigate(['main/list']);
      }
    });
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

  private uploadImg(img: SliderImg, nextIndex: number) {
    const storagePath = `${new Date().getTime()}_${img.file.name}`;

    this.task        = this.firestorage.upload(storagePath, img.file);
    this.percentage  = this.task.percentageChanges();
    this.percentage.subscribe(p => {
      console.log(p);
      if (p === 100) {
        const result: StuffImg = {
          index: img.index,
          path: storagePath,
          fileSize: img.file.size
        };

        this.stuff.images.push(result);
        console.log(this.stuff.images);
        this.sortByIndex();
        this.uploadQueue.next(nextIndex); // will be emittet two times!
      }
    });
  }

  private sortByIndex() {
    this.images.sort((a, b) => {
      return a.index - b.index;
    });
  }
}
