import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SouperAdminComponent} from './souper-admin.component';

const routes: Routes = [
  { path: 'admin',
    component: SouperAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SouperAdminRoutingModule { }
