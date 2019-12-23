import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SliderImg} from './slider-img';

@Component({
  selector: 'app-souper-images-slider-editor',
  templateUrl: './souper-images-slider-editor.component.html',
  styleUrls: ['./souper-images-slider-editor.component.css']
})
export class SouperImagesSliderEditorComponent {

  @Input() images: SliderImg[];
  @Output() imagesToUpload = new EventEmitter<SliderImg[]>();

  readonly addImgIconUrl = 'assets/baseline_add_a_photo_black_48dp.png';
  currIndex = 0;

  constructor() { }


  onSelectFiles($event) {
    for (const file of $event.target.files) {
      if (file.type.split('/')[0] !== 'image') {
        console.error('unsupported file type');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event: any) => {
        const sliderImg: SliderImg = {
          index: this.getNextIndex(),
          file: file,
          path: event.target.result
        };
        this.images.push(sliderImg);

        this.images.sort((a, b) => {
          return a.index - b.index;
        });
        this.imagesToUpload.emit(this.images);
      };
      reader.readAsDataURL(file);
    }
  }

  onRemove() {
    if (this.currIndex > -1) {
      this.images.splice(this.currIndex, 1);
      this.currIndex = 0;
    }
  }

  private getNextIndex(): number {
    if (this.images.length > 0) {
      const lastImg = this.images[this.images.length - 1];
      return (lastImg.index) ? lastImg.index + 1 : this.images.length; // highest index + 1
    } else {
      return 0;
    }
  }
}
