import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StuffService} from '../../../services/stuff/stuff.service';
import {SouperAuthService} from '../../../services/auth/souper-auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  testBasicTags = ['food', 'bars', 'test'];
  testAllAvailableTags = [
    'rewe',
    'hookah',
    'brand',
    'tobacco',
    'instant',
    'fastfood',
    'fish',
    'meat',
    'vegetarian',
    'love',
  ];
  filteredTags$: Observable<string[]>;
  selectedTags$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  separatorKeysCodes: number[] = [ENTER, COMMA];

  tagInputControl = new FormControl();

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private authService: SouperAuthService,
              private stuffService: StuffService,
              private router: Router) {
    this.filteredTags$ = this.tagInputControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this.filterTags(tag) : this.testAllAvailableTags.slice())
    );

    this.selectedTags$.subscribe(tags => this.stuffService.filterStuffsByTags(tags));
  }

  ngOnInit() {
  }

  get stuffs() {
    return this.stuffService.stuffs$;
  }

  onClickItem(stuffId: string) {
    // TODO  implement expansion panel
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
    this.router.navigate(['add']);
  }

  private filterTags(searchString: string) {
    const filterValue = searchString.toLowerCase();
    return this.testAllAvailableTags.filter(tag => tag.toLowerCase().startsWith(filterValue));
  }
}
