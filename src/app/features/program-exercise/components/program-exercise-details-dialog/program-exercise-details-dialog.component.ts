import { Component, Input, OnInit } from '@angular/core';
import { IProgram } from '../../../program/models/iProgram';
import { IProgramExercise } from '../../models/iexercise-program';
import { ProgramExerciseDetailsComponent } from '../program-exercise-details/program-exercise-details.component';
import { DialogComponent } from '../../../../core/components/dialog/dialog.component';

@Component({
  selector: 'app-program-exercise-details-dialog',
  imports: [DialogComponent],
  templateUrl: './program-exercise-details-dialog.component.html',
  styleUrl: './program-exercise-details-dialog.component.css',
})
export class ProgramExerciseDetailsDialogComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.programExercise);
  }
  @Input({ required: true }) programExercise: IProgramExercise | undefined;

  dialogContent = ProgramExerciseDetailsComponent;
}
