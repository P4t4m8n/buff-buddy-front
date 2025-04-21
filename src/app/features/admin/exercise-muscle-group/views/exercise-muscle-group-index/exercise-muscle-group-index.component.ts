import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseMuscleGroupService } from '../../services/exercise-muscle-group.service';
import { TableComponent } from '../../../../../core/components/table/table.component';
import { CRUD_SERVICE_TOKEN } from '../../../../../core/providers/providers';
import { ExerciseMuscleGroupEditDialogComponent } from '../../components/exercise-muscle-group-edit-dialog/exercise-muscle-group-edit-dialog.component';

@Component({
  selector: 'app-exercise-icon-index',
  imports: [
    ReactiveFormsModule,
    TableComponent,
    ExerciseMuscleGroupEditDialogComponent,
  ],
  templateUrl: './exercise-muscle-group-index.component.html',
  styleUrl: './exercise-muscle-group-index.component.css',
  providers: [
    { provide: CRUD_SERVICE_TOKEN, useExisting: ExerciseMuscleGroupService },
  ],
})
export class ExerciseIconIndexComponent {
  columnsHeader = ['imgUrl', 'name', 'actions'];
}
