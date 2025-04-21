import { Component, Input, OnInit } from '@angular/core';
import { IExerciseIcon } from '../../models/exerciseIcon';
import { DialogComponent } from '../../../../../core/components/dialog/dialog.component';
import { ExerciseIconEditComponent } from '../../views/exercise-icon-edit/exercise-icon-edit.component';

@Component({
  selector: 'app-exercise-icon-edit-dialog',
  imports: [DialogComponent],
  templateUrl: './exercise-icon-edit-dialog.component.html',
  styleUrl: './exercise-icon-edit-dialog.component.css',
})
export class ExerciseIconEditDialogComponent implements OnInit {
  @Input() exerciseIcon: IExerciseIcon | undefined;

  editComponent = ExerciseIconEditComponent;
  buttonText = 'Create';
  ngOnInit(): void {
    this.buttonText = this.exerciseIcon ? 'Update' : 'Create';
  }
}
