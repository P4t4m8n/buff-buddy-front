import { Component, Input } from '@angular/core';
import {
  IProgramExercise,
  IProgramExerciseEditDTO,
} from '../../models/iexercise-program';
import { ExerciseProgramEditComponent } from '../program-exercise-edit/program-exercise-edit.component';
import { DialogComponent } from '../../../../core/components/dialog/dialog.component';
import { ProgramExerciseToDtoPipe } from '../../pipes/program-exercise-to-dto.pipe';

@Component({
  selector: 'app-exercise-program-edit-dialog',
  imports: [DialogComponent, ProgramExerciseToDtoPipe],
  templateUrl: './program-exercise-edit-dialog.component.html',
  styleUrl: './program-exercise-edit-dialog.component.css',
})
export class ExerciseProgramEditDialogComponent {
  @Input() item: IProgramExercise | undefined;

  editComponent = ExerciseProgramEditComponent;
  buttonText = 'Create';
  ngOnInit(): void {
    this.buttonText = this.item ? 'Update' : 'Create';
  }
}
