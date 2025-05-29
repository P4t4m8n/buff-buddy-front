import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseMuscleService } from '../../services/exercise-muscle.service';
import { CRUD_SERVICE_TOKEN } from '../../../../../../core/providers/providers';
import { TableComponent } from '../../../../../../core/components/table/table.component';
import { ExerciseMuscleEditComponent } from '../../components/exercise-muscle-edit/exercise-muscle-edit.component';
import {
  EXERCISE_INFO_TABLE_GRID_COLS,
  EXERCISE_INFO_TABLE_HEADERS,
} from '../../../consts/consts';

@Component({
  selector: 'app-exercise-muscle-index',
  imports: [ReactiveFormsModule, TableComponent, ExerciseMuscleEditComponent],
  templateUrl: './exercise-muscle-index.component.html',
  styleUrl: '../../../styles/exercise-info-index.css',
  providers: [
    { provide: CRUD_SERVICE_TOKEN, useExisting: ExerciseMuscleService },
  ],
})
export class ExerciseMuscleIndexComponent {
  columnsHeader = EXERCISE_INFO_TABLE_HEADERS;
  gridTemplateColumns = EXERCISE_INFO_TABLE_GRID_COLS;

  editDialogType = ExerciseMuscleEditComponent;
}
