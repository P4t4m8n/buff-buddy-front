import { Component, Input } from '@angular/core';
import {
  IProgramExerciseDto,
  IProgramExerciseEditDTO,
} from '../../models/iexercise-program';
import { ProgramExerciseEditComponent } from '../program-exercise-edit/program-exercise-edit.component';
import { DialogComponent } from '../../../../core/components/dialog/dialog.component';
import { ProgramExerciseToDtoPipe } from '../../pipes/program-exercise-to-dto.pipe';

@Component({
  selector: 'app-program-exercise-edit-dialog',
  imports: [DialogComponent],
  templateUrl: './program-exercise-edit-dialog.component.html',
  styleUrl: './program-exercise-edit-dialog.component.css',
})
export class ProgramExerciseEditDialogComponent {
  @Input() item: IProgramExerciseEditDTO | undefined;
  @Input() onSaveProgramExercise:
    | ((exercise: IProgramExerciseEditDTO) => void)
    | undefined;

  editComponent = ProgramExerciseEditComponent;
  buttonText = 'Create';
  ngOnInit(): void {
    this.buttonText = this.item ? 'Update' : 'Create';
  }
  get dialogData() {
    return {
      item: this.item,
      onSaveProgramExercise: this.onSaveProgramExercise,
    };
  }
}
