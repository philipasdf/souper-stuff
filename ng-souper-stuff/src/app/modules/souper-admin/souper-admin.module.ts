import {NgModule} from '@angular/core';
import {SouperAdminComponent} from './souper-admin.component';
import {SharedModule} from '../../shared-modules/shared.module';
import {SouperAdminRoutingModule} from './souper-admin-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SouperAdminComponent,
  ],
  imports: [
    SharedModule,
    SouperAdminRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})
export class SouperAdminModule { }
