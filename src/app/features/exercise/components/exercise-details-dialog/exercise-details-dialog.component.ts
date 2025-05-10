import { Component, Inject } from '@angular/core';
import { IExercise } from '../../types/exercise.type';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { MatButton } from '@angular/material/button';
import { ExerciseDetailsContentComponent } from '../exercise-details-content/exercise-details-content.component';

@Component({
  selector: 'app-exercise-details-dialog',
  imports: [MatDialogModule, MatButton, ExerciseDetailsContentComponent],
  templateUrl: './exercise-details-dialog.component.html',
  styleUrl: './exercise-details-dialog.component.css',
})
export class ExerciseDetailsDialogComponent {
  item!: IExercise;
  constructor(@Inject(MAT_DIALOG_DATA) public data: IExercise) {
    this.item = data;
  }
}
