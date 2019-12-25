import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireAuth} from '@angular/fire/auth';
import {SouperImagesModule} from '../modules/souper-images/souper-images.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Browser} from 'selenium-webdriver';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SouperImagesModule,
    BrowserAnimationsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    SouperImagesModule,
    BrowserAnimationsModule
  ],
  providers: [
    AngularFireAuth
  ]
})
export class SharedModule { }
