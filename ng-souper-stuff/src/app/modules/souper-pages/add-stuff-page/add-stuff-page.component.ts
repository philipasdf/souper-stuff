import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Stuff} from '../../../services/stuff/stuff';
import {StuffService} from '../../../services/stuff/stuff.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {GroupService} from '../../../services/group/group.service';

@Component({
  selector: 'app-add-stuff-page',
  templateUrl: './add-stuff-page.component.html'
})
export class AddStuffPageComponent implements OnInit {

  formGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    price: new FormControl(),
    note: new FormControl(),
    addressGroup: new FormGroup({
      street: new FormControl(),
      city: new FormControl(),
      publicStation: new FormControl()
    })
  });

  selectedTags$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private stuffService: StuffService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const tagObject = {};
    const currentTags: string[] = this.selectedTags$.getValue();
    currentTags.forEach(tagString => tagObject[tagString] = true);

    const newStuff: Stuff = {
      active: true,
      name: this.formGroup.get('name').value,
      price: this.formGroup.get('price').value,
      rating: 0,
      note: this.formGroup.get('note').value,
      count: 1,
      tags: tagObject, // look into firestore console to see the structure
      lastUpdated: new Date()
    };

    this.stuffService.createStuff(newStuff);
    this.router.navigate(['main/list']);
  }
}
