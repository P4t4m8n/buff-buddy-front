import { Component, Inject, inject, Optional } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { IExerciseInfo, IExerciseInfoDTO } from '../../../models/exerciseInfo';
import { ValidationToErrorPipe } from '../../../../../../core/pipes/validation-to-error.pipe';
import { MatInputComponent } from '../../../../../../core/components/form/mat-input/mat-input.component';
import { InputImgComponent } from '../../../../../../core/components/form/input-img/input-img.component';
import { ExerciseMuscleService } from '../../services/exercise-muscle.service';
import { BaseExerciseInfoEditDirective } from '../../../directives/base-exercise-info-edit-component.directive';

@Component({
  selector: 'app-exercise-muscle-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    ValidationToErrorPipe,
    MatInputComponent,
    InputImgComponent,
  ],
  templateUrl: './exercise-muscle-edit.component.html',
  styleUrl: './exercise-muscle-edit.component.css',
})
export class ExerciseMuscleEditComponent extends BaseExerciseInfoEditDirective<
  IExerciseInfo,
  IExerciseInfoDTO
> {
  protected exerciseService = inject(ExerciseMuscleService);

  constructor(
    @Optional() dialogRef: MatDialogRef<ExerciseMuscleEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) data: IExerciseInfo | undefined
  ) {
    super(dialogRef, data);
  }
}
