import {NgModule} from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatDividerModule,
  MatIconModule,
  MatChipsModule,
  MatAutocompleteModule
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
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule
  ]
})
export class MaterialModule { }
