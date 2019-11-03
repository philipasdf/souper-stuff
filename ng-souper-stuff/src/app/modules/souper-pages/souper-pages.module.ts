import {NgModule} from '@angular/core';
import {SouperPagesComponent} from './souper-pages.component';
import {SharedModule} from '../../shared-modules/shared.module';
import {SouperPagesRoutingModule} from './souper-pages-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    SouperPagesComponent,
    LoginPageComponent,
    MainPageComponent,
  ],
  imports: [
    SharedModule,
    SouperPagesRoutingModule,
  ],
  exports: [
  ]
})
export class SouperPagesModule { }
