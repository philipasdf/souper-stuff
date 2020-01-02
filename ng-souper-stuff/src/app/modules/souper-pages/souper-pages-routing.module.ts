import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginPageComponent} from './login-page/login-page.component';
import {MainPageComponent} from './main-page/main-page.component';
import {SouperPagesComponent} from './souper-pages.component';
import {AddStuffPageComponent} from './add-stuff-page/add-stuff-page.component';
import {AuthGuard} from '../../guards/auth.guard';
import {InfoPageComponent} from './info-page/info-page.component';
import {CalendarPageComponent} from '../souper-history/calendar-page/calendar-page.component';

const routes: Routes = [
  { path: '',
    component: SouperPagesComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'info', component: InfoPageComponent },
    ]
  },
  {
    path: 'main',
    component: SouperPagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'list', component: MainPageComponent, },
      { path: 'add', component: AddStuffPageComponent },
      { path: 'edit/:id', component: AddStuffPageComponent },
    ]
  },
  {
    path: 'history',
    component: SouperPagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'calendar', component: CalendarPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SouperPagesRoutingModule { }
