import { Component, Input, OnInit } from '@angular/core';
import { IExercise } from '../../types/exercise.type';
import { ExerciseEditComponent } from '../exercise-edit/exercise-edit.component';
import { DialogComponent } from '../../../../core/components/dialog/dialog.component';
import { ExerciseToDtoPipe } from '../../pipes/exercise-to-dto.pipe';

@Component({
  selector: 'app-exercise-edit-dialog',
  imports: [DialogComponent,ExerciseToDtoPipe],
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
