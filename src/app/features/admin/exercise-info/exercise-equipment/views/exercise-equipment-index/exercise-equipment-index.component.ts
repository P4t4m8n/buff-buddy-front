import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../../../../../core/components/table/table.component';
import { CRUD_SERVICE_TOKEN } from '../../../../../../core/providers/providers';
import { ExerciseEquipmentService } from '../../services/exercise-equipment.service';
import {
  EXERCISE_INFO_TABLE_GRID_COLS,
  EXERCISE_INFO_TABLE_HEADERS,
} from '../../../consts/consts';
import { ExerciseEquipmentEditComponent } from '../../components/exercise-equipment-edit/exercise-equipment-edit.component';

@Component({
  selector: 'app-exercise-equipment-index',
  imports: [
    ReactiveFormsModule,
    TableComponent,
    ExerciseEquipmentEditComponent,
  ],
  templateUrl: './exercise-equipment-index.component.html',
  styleUrl: '../../../styles/exercise-info-index.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useExisting: ExerciseEquipmentService,
    },
  ],
})
export class ExerciseEquipmentIndexComponent {
  columnsHeader = EXERCISE_INFO_TABLE_HEADERS;
  gridTemplateColumns = EXERCISE_INFO_TABLE_GRID_COLS;
  editDialogType = ExerciseEquipmentEditComponent;
}
