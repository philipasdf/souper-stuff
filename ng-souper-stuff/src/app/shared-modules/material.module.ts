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
  MatAutocompleteModule,
  MatDatepickerModule, MatNativeDateModule, MatMenuModule
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    DragDropModule
  ],
  providers: [
    MatNativeDateModule
  ]
})
export class MaterialModule { }
