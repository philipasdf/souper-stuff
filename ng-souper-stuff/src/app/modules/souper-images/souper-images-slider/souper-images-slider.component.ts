import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-souper-images-slider',
  templateUrl: './souper-images-slider.component.html',
  styleUrls: ['./souper-images-slider.component.css']
})
export class SouperImagesSliderComponent implements OnInit {

  @Input() images;



  constructor() { }

  ngOnInit() {
  }

  // get image if chosen
}
