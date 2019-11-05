import {NgModule} from '@angular/core';
import {SouperPagesComponent} from './souper-pages.component';
import {SharedModule} from '../../shared-modules/shared.module';
import {SouperPagesRoutingModule} from './souper-pages-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddStuffPageComponent } from './add-stuff-page/add-stuff-page.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SouperPagesComponent,
    LoginPageComponent,
    MainPageComponent,
    AddStuffPageComponent,
  ],
  imports: [
    SharedModule,
    SouperPagesRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})
export class SouperPagesModule { }
