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
import {DragDropModule} from '@angular/cdk/drag-drop';

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
    MatAutocompleteModule,
    DragDropModule
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
    MatAutocompleteModule,
    DragDropModule
  ]
})
export class MaterialModule { }
