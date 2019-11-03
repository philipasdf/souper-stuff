import {NgModule} from '@angular/core';
import {MatFormFieldModule, MatInputModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule { }
