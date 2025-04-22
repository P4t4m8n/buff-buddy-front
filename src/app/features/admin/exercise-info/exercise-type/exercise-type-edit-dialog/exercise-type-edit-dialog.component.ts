import { Component, Input, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../../core/components/dialog/dialog.component';
import { ExerciseTypeEditComponent } from '../views/exercise-type-edit/exercise-type-edit.component';
import { IExerciseInfo } from '../../models/exerciseInfo';

@Component({
  selector: 'app-exercise-type-edit-dialog',
  imports: [DialogComponent],
  templateUrl: './exercise-type-edit-dialog.component.html',
  styleUrl: './exercise-type-edit-dialog.component.css',
})
export class ExerciseTypeEditDialogComponent implements OnInit {
  @Input() exerciseIcon: IExerciseInfo | undefined;

  editComponent = ExerciseTypeEditComponent;
  buttonText = 'Create';
  ngOnInit(): void {
    this.buttonText = this.exerciseIcon ? 'Update' : 'Create';
  }
}
