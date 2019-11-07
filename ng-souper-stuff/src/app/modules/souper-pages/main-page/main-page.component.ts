import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StuffService} from '../../../services/stuff/stuff.service';
import {SouperAuthService} from '../../../services/auth/souper-auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {map, startWith, take} from 'rxjs/operators';
import {GroupService} from '../../../services/group/group.service';
import {Tag} from '../../../services/group/tag';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

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
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    this.groupService.currentGroupTags$.subscribe((tags: Tag[]) => {
      this.allAvailableTags = tags.map(tag => tag.name);
    });

    this.filteredTags$ = this.tagInputControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this.filterTags(tag) : this.allAvailableTags.slice())
    );

    this.selectedTags$.subscribe(tags => this.stuffService.filterStuffsByTags(tags));
  }

  ngOnInit() {
  }

  get group() {
    return this.groupService.currentGroup$;
  }

  get groupTags() {
    return this.groupService.currentGroupTags$;
  }

  get stuffs() {
    return this.stuffService.stuffs$;
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

  onAddStuff() {
    this.router.navigate(['main/add']);
  }

  private filterTags(searchString: string) {
    const filterValue = searchString.toLowerCase();
    return this.allAvailableTags.filter(tag => tag.toLowerCase().startsWith(filterValue));
  }
}
