import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Stuff} from '../../../services/stuff/stuff';
import {StuffService} from '../../../services/stuff/stuff.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {GroupService} from '../../../services/group/group.service';
import {StuffImg} from '../../../services/images/stuff-img';

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

  images: StuffImg[] = [];
  selectedTags$: BehaviorSubject<string[]> = new BehaviorSubject([]);


  constructor(private stuffService: StuffService,
              private groupService: GroupService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const stuffId = this.activatedRoute.snapshot.params['id'];
    if (stuffId) {
      this.editMode = true;
      this.stuffService.getStuff(stuffId).subscribe(stuff => this.stuff = stuff);
    }
  }

  getButtonName() {
    return this.editMode ? 'Save' : 'Create';
  }

  onFileUploaded(img: StuffImg) {
    if (!this.images.some((s: StuffImg) => s.path === img.path)) {
      this.images.push(img);
    }
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

    if (this.editMode) {
      this.stuffService.updateStuff(this.stuff);
    } else {
      this.stuffService.createStuff(this.stuff);
    }
    this.groupService.createTags(currentTags);
    this.router.navigate(['main/list']);
  }
}
