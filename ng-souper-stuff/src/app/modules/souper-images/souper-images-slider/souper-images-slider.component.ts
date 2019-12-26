import {Component, Input, OnInit} from '@angular/core';
import {ImgService} from '../../../services/images/img.service';
import {Observable} from 'rxjs';
import {StuffImg} from '../../../services/images/stuff-img';

@Component({
  selector: 'app-souper-images-slider',
  templateUrl: './souper-images-slider.component.html',
  styleUrls: ['./souper-images-slider.component.css']
})
export class SouperImagesSliderComponent implements OnInit {

  @Input() images: StuffImg[];

  currIndex = 0;
  sliderBarArray = [];
  imgUrl: Observable<string>;


  constructor(private imgService: ImgService) { }

  ngOnInit() {
    for (let i = 0; i < this.images.length; i++) {
      this.sliderBarArray.push(i);
    }

    console.log(this.images);
    console.log(this.sliderBarArray);
    this.initImg();
  }

  isCurrIndex(i) {
    return this.currIndex === i;
  }

  onSwipeLeft() {
    if (this.currIndex < this.images.length - 1) {
      this.currIndex = this.currIndex + 1;
      this.initImg();
    }
  }

  onSwipeRight() {
    if (this.currIndex > 0) {
      this.currIndex = this.currIndex - 1;
      this.initImg();
    }
  }

  onDragEnd(event) {
    event.source.reset();
  }

  private initImg() {
    if (this.images && this.images.length > 0) {
      this.imgUrl = this.imgService.getImgSize500(this.images[this.currIndex].path);
    }
  }
}
