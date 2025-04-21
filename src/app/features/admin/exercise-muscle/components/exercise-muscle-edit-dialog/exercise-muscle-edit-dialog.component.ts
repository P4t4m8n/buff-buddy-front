import { Component, Input, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../../core/components/dialog/dialog.component';
import { ExerciseMuscleEditComponent } from '../../views/exercise-muscle-edit/exercise-muscle-edit.component';
import { IExerciseMuscle } from '../../models/exerciseMuscle.model';

@Component({
  selector: 'app-exercise-muscle-edit-dialog',
  imports: [DialogComponent],
  templateUrl: './exercise-muscle-edit-dialog.component.html',
  styleUrl: './exercise-muscle-edit-dialog.component.css',
})
export class ExerciseMuscleEditDialogComponent implements OnInit {
  @Input() exerciseIcon: IExerciseMuscle | undefined;

  editComponent = ExerciseMuscleEditComponent;
  buttonText = 'Create';
  ngOnInit(): void {
    this.buttonText = this.exerciseIcon ? 'Update' : 'Create';
  }
}
