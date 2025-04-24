import { Component, Input, OnInit } from '@angular/core';
import { IExercise } from '../../types/exercise.type';
import { ExerciseEditComponent } from '../../pages/exercise-edit/exercise-edit.component';
import { DialogComponent } from '../../../../core/components/dialog/dialog.component';

@Component({
  selector: 'app-exercise-edit-dialog',
  imports: [DialogComponent],
  templateUrl: './exercise-edit-dialog.component.html',
  styleUrl: './exercise-edit-dialog.component.css',
})
export class ExerciseEditDialogComponent implements OnInit {
  @Input() item: IExercise | undefined;

  editComponent = ExerciseEditComponent;
  buttonText = 'Create';
  ngOnInit(): void {
    this.buttonText = this.item ? 'Update' : 'Create';
  }
}
