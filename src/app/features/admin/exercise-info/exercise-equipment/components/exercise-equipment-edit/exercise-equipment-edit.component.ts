import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IExerciseInfoDTO,
  IExerciseInfoEditDTO,
} from '../../../models/exerciseInfo';
import { InputImgComponent } from '../../../../../../core/components/form/input-img/input-img.component';
import { ExerciseEquipmentService } from '../../services/exercise-equipment.service';
import { BaseExerciseInfoEditDirective } from '../../../directives/base-exercise-info-edit.directive';
import { DialogComponent } from '../../../../../../core/components/dialog/dialog.component';
import { InputComponent } from '../../../../../../core/components/form/input/input.component';

@Component({
  selector: 'app-exercise-equipment-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputImgComponent,
    DialogComponent,
    InputComponent,
  ],
  templateUrl: '../../../templates/exercise-info-edit.html',
  styleUrl: './exercise-equipment-edit.component.css',
})
export class ExerciseEquipmentEditComponent extends BaseExerciseInfoEditDirective<
  IExerciseInfoDTO,
  IExerciseInfoEditDTO
> {
  protected exerciseService = inject(ExerciseEquipmentService);
}
