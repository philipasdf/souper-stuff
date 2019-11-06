import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StuffService} from '../../../services/stuff/stuff.service';
import {SouperAuthService} from '../../../services/auth/souper-auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  testBasicTags = ['food', 'bars', 'test'];
  selectedTags = [];
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
  ];
  filteredTags: Observable<string[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  tagInputControl = new FormControl();

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private authService: SouperAuthService,
              private stuffService: StuffService,
              private router: Router) {
    this.filteredTags = this.tagInputControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this.filterTags(tag) : this.testAllAvailableTags.slice())
    );
  }

  ngOnInit() {
  }

  get stuffs() {
    return this.stuffService.stuffs;
  }

  onClickItem(stuffId: string) {
    // TODO  implement expansion panel
  }

  onSelectBasicTag(tag) {
    this.selectedTags.push(tag);
  }

  onSelectTag(event: MatAutocompleteSelectedEvent) {
    this.selectedTags.push(event.option.viewValue);
    this.tagInputControl.setValue('');
  }

  onRemoveTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  onAddStuff() {
    this.router.navigate(['add']);
  }

  private filterTags(searchString: string) {
    const filterValue = searchString.toLowerCase();
    return this.testAllAvailableTags.filter(tag => tag.toLowerCase().startsWith(filterValue));
  }
}
