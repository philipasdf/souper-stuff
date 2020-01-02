import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared-modules/shared.module';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';

@NgModule({
  declarations: [
    CalendarPageComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CalendarPageComponent
  ]
})
export class SouperHistoryModule { }
