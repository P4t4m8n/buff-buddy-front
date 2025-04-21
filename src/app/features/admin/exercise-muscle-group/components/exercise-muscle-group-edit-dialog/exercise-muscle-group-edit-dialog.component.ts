import { Component, Input, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../../core/components/dialog/dialog.component';
import { ExerciseIconEditComponent } from '../../views/exercise-muscle-group-edit/exercise-muscle-group-edit.component';
import { IExerciseMuscleGroup } from '../../models/exerciseMuscleGroup.model';

@Component({
  selector: 'app-exercise-icon-edit-dialog',
  imports: [DialogComponent],
  templateUrl: './exercise-muscle-group-edit-dialog.component.html',
  styleUrl: './exercise-muscle-group-edit-dialog.component.css',
})
export class ExerciseMuscleGroupEditDialogComponent implements OnInit {
  @Input() exerciseIcon: IExerciseMuscleGroup | undefined;

  editComponent = ExerciseIconEditComponent;
  buttonText = 'Create';
  ngOnInit(): void {
    this.buttonText = this.exerciseIcon ? 'Update' : 'Create';
  }
}
