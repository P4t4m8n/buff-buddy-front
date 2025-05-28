import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IExerciseInfoDTO,
  IExerciseInfoEditDTO,
} from '../../../models/exerciseInfo';
import { ValidationToErrorPipe } from '../../../../../../core/pipes/validation-to-error.pipe';
import { InputImgComponent } from '../../../../../../core/components/form/input-img/input-img.component';
import { ExerciseMuscleService } from '../../services/exercise-muscle.service';
import { BaseExerciseInfoEditDirective } from '../../../directives/base-exercise-info-edit.directive';
import { DialogComponent } from '../../../../../../core/components/dialog/dialog.component';
import { InputComponent } from '../../../../../../core/components/form/input/input.component';

@Component({
  selector: 'app-exercise-muscle-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputImgComponent,
    DialogComponent,
    InputComponent,
  ],
  templateUrl: '../../../templates/exercise-info-edit.html',
  styleUrl: '../../../styles/exercise-info-edit.css',
})
export class ExerciseMuscleEditComponent extends BaseExerciseInfoEditDirective<
  IExerciseInfoDTO,
  IExerciseInfoEditDTO
> {
  protected exerciseService = inject(ExerciseMuscleService);
}
