import {Component, Input, OnInit} from '@angular/core';
import {Stuff} from '../../../../services/stuff/stuff';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StuffService} from '../../../../services/stuff/stuff.service';
import {BehaviorSubject} from 'rxjs';
import {GroupService} from '../../../../services/group/group.service';

@Component({
  selector: 'app-stuff-list-element',
  templateUrl: './stuff-list-element.component.html',
  styleUrls: ['./stuff-list-element.component.css'],
  animations: [
    trigger('expandElementAnimation', [
      state('open', style({
        opacity: 1,
        height: '*'
      })),
      state('closed', style({
        opacity: 0,
        height: 0
      })),
      transition('open <=> closed', [
        animate('250ms ease-out')
      ])
    ])
  ]
})
export class StuffListElementComponent implements OnInit {

  @Input() stuff: Stuff;

  expandView = false;
  editMode = false;

  selectedTags$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private stuffService: StuffService,
              private groupService: GroupService) { }

  ngOnInit() {
    const tagArray: string[] = [];
    for (const key in this.stuff.tags) {
      tagArray.push(key);
    }
    this.selectedTags$.next(tagArray);
  }

  onToggleExpandView() {
    this.expandView = !this.expandView;
  }

  onToggleEditMode() {
    this.editMode = !this.editMode;
  }

  onRatingsUpdated(rating) {
    this.stuff.rating = rating;
  }

  onSave() {
    const tagObject = {};
    const currentTags: string[] = this.selectedTags$.getValue();
    currentTags.forEach(tagString => tagObject[tagString] = true);
    this.stuff.tags = tagObject;
    console.log(this.stuff);
    this.groupService.createTags(currentTags);
    this.stuffService.updateStuff(this.stuff);
    this.onToggleEditMode();
  }
}
