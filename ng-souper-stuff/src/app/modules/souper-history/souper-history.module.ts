import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared-modules/shared.module';
import {SouperHistoryRoutingModule} from './souper-history-routing.module';
import {SouperHistoryComponent} from './souper-history.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';

@NgModule({
  declarations: [
    SouperHistoryComponent,
    CalendarPageComponent,
  ],
  imports: [
    SharedModule,
    SouperHistoryRoutingModule
  ],
  exports: [
  ]
})
export class SouperHistoryModule { }
