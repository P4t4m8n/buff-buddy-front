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

import {
  IExerciseInfoEditDTO,
  IExerciseInfoDTO,
} from '../../../models/exerciseInfo';
import { ValidationToErrorPipe } from '../../../../../../core/pipes/validation-to-error.pipe';
import { MatInputComponent } from '../../../../../../core/components/form/mat-input/mat-input.component';
import { InputImgComponent } from '../../../../../../core/components/form/input-img/input-img.component';
import { BaseExerciseInfoEditDirective } from '../../../directives/base-exercise-info-edit.directive';
import { ExerciseTypeService } from '../../services/exercise-type.service';
import { DialogComponent } from '../../../../../../core/components/dialog/dialog.component';
import { InputComponent } from '../../../../../../core/components/form/input/input.component';

@Component({
  selector: 'app-exercise-type-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputImgComponent,
    DialogComponent,
    InputComponent,
  ],
  templateUrl: '../../../templates/exercise-info-edit.html',
  styleUrl: './exercise-type-edit.component.css',
})
export class ExerciseTypeEditComponent extends BaseExerciseInfoEditDirective<
  IExerciseInfoDTO,
  IExerciseInfoEditDTO
> {
  protected exerciseService = inject(ExerciseTypeService);
}
