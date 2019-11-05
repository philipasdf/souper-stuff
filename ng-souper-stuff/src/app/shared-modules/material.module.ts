import {NgModule} from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatDividerModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatIconModule
  ]
})
export class MaterialModule { }
