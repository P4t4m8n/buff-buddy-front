import { Component, Input, OnInit } from '@angular/core';
import { ExerciseMuscleEditComponent } from '../../views/exercise-muscle-edit/exercise-muscle-edit.component';
import { IExerciseInfo } from '../../../models/exerciseInfo';
import { DialogComponent } from '../../../../../../core/components/dialog/dialog.component';

@Component({
  selector: 'app-exercise-muscle-edit-dialog',
  imports: [DialogComponent],
  templateUrl: './exercise-muscle-edit-dialog.component.html',
  styleUrl: './exercise-muscle-edit-dialog.component.css',
})
export class ExerciseMuscleEditDialogComponent implements OnInit {
  @Input() item: IExerciseInfo | undefined;

  editComponent = ExerciseMuscleEditComponent;
  buttonText = 'Create';
  ngOnInit(): void {
    this.buttonText = this.item ? 'Update' : 'Create';
  }
}
