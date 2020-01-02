import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../../guards/auth.guard';
import {SouperHistoryComponent} from './souper-history.component';
import {CalendarPageComponent} from './calendar-page/calendar-page.component';

const routes: Routes = [
  {
    path: 'history',
    component: SouperHistoryComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'calendar', component: CalendarPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SouperHistoryRoutingModule { }
