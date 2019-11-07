import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Stuff} from '../../../services/stuff/stuff';
import {StuffService} from '../../../services/stuff/stuff.service';
import {Router} from '@angular/router';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {BehaviorSubject, Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import {GroupService} from '../../../services/group/group.service';
import {Tag} from '../../../services/group/tag';

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

  // tags
  basicTags = ['food', 'bars', 'test'];
  allAvailableTags = [];
  filteredTags$: Observable<string[]>;
  selectedTags$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  separatorKeysCodes: number[] = [ENTER, COMMA];

  tagInputControl = new FormControl();

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private stuffService: StuffService,
              private groupService: GroupService,
              private router: Router) {
    this.groupService.currentGroupTags$.subscribe((tags: Tag[]) => {
      this.allAvailableTags = tags.map(tag => tag.name);
    });

    this.filteredTags$ = this.tagInputControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this.filterTags(tag) : this.allAvailableTags.slice())
    );
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

  addNewTag(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const currentTags: string[] = this.selectedTags$.getValue();
      this.selectedTags$.next([...currentTags, value]);
    }
    if (input) {
      input.value = '';
    }
    this.tagInputControl.setValue(null);
  }

  onSelectBasicTag(tag) {
    const currentTags: string[] = this.selectedTags$.getValue();
    this.selectedTags$.next([...currentTags, tag]);
  }

  onSelectTag(event: MatAutocompleteSelectedEvent) {
    const newTag = event.option.viewValue;
    const currentTags: string[] = this.selectedTags$.getValue();
    this.selectedTags$.next([...currentTags, newTag]);

    this.tagInput.nativeElement.value = '';
    this.tagInputControl.setValue(null);
  }

  onRemoveTag(tag: string) {
    const currentTags: string[] = this.selectedTags$.getValue();
    const index = currentTags.indexOf(tag);

    if (index >= 0) {
      currentTags.splice(index, 1);
    }
    this.selectedTags$.next(currentTags);
  }

  private filterTags(searchString: string) {
    const filterValue = searchString.toLowerCase();
    return this.allAvailableTags.filter(tag => tag.toLowerCase().startsWith(filterValue));
  }
}
