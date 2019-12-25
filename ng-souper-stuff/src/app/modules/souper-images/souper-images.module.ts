import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { SouperImagesSliderComponent } from './souper-images-slider/souper-images-slider.component';
import { SouperImagesSliderEditorComponent } from './souper-images-slider-editor/souper-images-slider-editor.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../shared-modules/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    SouperImagesSliderComponent,
    SouperImagesSliderEditorComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    SouperImagesSliderComponent,
    SouperImagesSliderEditorComponent,
  ]
})
export class SouperImagesModule { }
