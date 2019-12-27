import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {GroupService} from '../../../services/group/group.service';
import {Tag} from '../../../services/group/tag';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-select-tags-field',
  templateUrl: './select-tags-field.component.html'
})
export class SelectTagsFieldComponent implements OnInit {

  @Input() placeholderText = '';
  @Input() selectedTags$: BehaviorSubject<string[]>;
  @Input() readonly = false;
  @Input() showBasicTags = true;
  @Input() addOnBlur;

  basicTags = ['food', 'vegetarian', 'instant', 'takeaway', 'cook', 'cheese', 'rice', 'noodles', 'bread', 'healthy', 'breakfast'];
  allAvailableTags = [];
  filteredTags$: Observable<string[]>;
  tagInputControl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private groupService: GroupService) {
    this.groupService.currentGroupTags$.subscribe((tags: Tag[]) => {
      this.allAvailableTags = tags.map(tag => tag.name);
    });

    this.filteredTags$ = this.tagInputControl.valueChanges.pipe(
      map((tag: string | null) => tag ? this.filterTags(tag) : this.allAvailableTags.slice())
    );
  }

  ngOnInit() {
  }

  addNewTag(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const currentTags: string[] = this.selectedTags$.getValue();
      this.selectedTags$.next([...currentTags, value.toLowerCase()]);
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
