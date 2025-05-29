import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../../../../../core/components/table/table.component';
import { CRUD_SERVICE_TOKEN } from '../../../../../../core/providers/providers';
import { ExerciseTypeService } from '../../services/exercise-type.service';
import { ExerciseTypeEditComponent } from '../../components/exercise-type-edit/exercise-type-edit.component';
import {
  EXERCISE_INFO_TABLE_GRID_COLS,
  EXERCISE_INFO_TABLE_HEADERS,
} from '../../../consts/consts';

@Component({
  selector: 'app-exercise-type-index',
  imports: [ReactiveFormsModule, TableComponent, ExerciseTypeEditComponent],
  templateUrl: './exercise-type-index.component.html',
  styleUrl: '../../../styles/exercise-info-index.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useExisting: ExerciseTypeService,
    },
  ],
})
export class ExerciseTypeIndexComponent {
  columnsHeader = EXERCISE_INFO_TABLE_HEADERS;
  gridTemplateColumns = EXERCISE_INFO_TABLE_GRID_COLS;
  editDialogType = ExerciseTypeEditComponent;
}
