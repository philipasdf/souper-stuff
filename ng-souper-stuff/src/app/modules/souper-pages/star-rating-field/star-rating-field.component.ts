import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-star-rating-field',
  templateUrl: './star-rating-field.component.html',
  styles: [`
    ::ng-deep .mat-icon{
      font-size: 1.5em !important;
    }
    ::ng-deep .mat-icon-button {
      width: 25px;
    }
  `]
})
export class StarRatingFieldComponent implements OnInit {

  @Input() rating: number;
  @Input() readonly = false;
  @Output() ratingUpdated = new EventEmitter();

  starCount = 5;
  ratingArr = [];

  constructor() { }

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    if (!this.readonly) {
      this.ratingUpdated.emit(rating);
    }
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
