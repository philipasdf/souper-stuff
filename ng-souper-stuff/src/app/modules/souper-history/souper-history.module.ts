import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared-modules/shared.module';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { CalendarThumbnailComponent } from './calendar-page/calendar-thumbnail/calendar-thumbnail.component';

@NgModule({
  declarations: [
    CalendarPageComponent,
    CalendarThumbnailComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CalendarPageComponent
  ]
})
export class SouperHistoryModule { }
