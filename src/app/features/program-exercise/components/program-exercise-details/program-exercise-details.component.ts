import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { IProgramExercise } from '../../models/iexercise-program';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ExerciseDetailsContentComponent } from '../../../exercise/components/exercise-details-content/exercise-details-content.component'; // Import this if you use app-exercise-details-content
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-program-exercise-details',
  standalone: true, // Make it standalone for easier module management
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './program-exercise-details.component.html',
  styleUrl: './program-exercise-details.component.css',
})
export class ProgramExerciseDetailsComponent implements OnInit {
  ngOnInit(): void {
    console.log('Program Exercise Details:', this.programExercise);
  }
  @Input()
  programExercise: IProgramExercise | undefined;

  constructor(
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    dataFromDialog: IProgramExercise | undefined
  ) {
    if (dataFromDialog) {
      this.programExercise = dataFromDialog;
    }
  }
}
