import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginPageComponent} from './login-page/login-page.component';
import {MainPageComponent} from './main-page/main-page.component';
import {SouperPagesComponent} from './souper-pages.component';

const routes: Routes = [
  { path: '',
    component: SouperPagesComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'main', component: MainPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SouperPagesRoutingModule { }
