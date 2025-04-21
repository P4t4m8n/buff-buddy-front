import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseMuscleService } from '../../services/exercise-muscle-group.service';
import { TableComponent } from '../../../../../core/components/table/table.component';
import { CRUD_SERVICE_TOKEN } from '../../../../../core/providers/providers';
import { ExerciseMuscleEditDialogComponent } from '../../components/exercise-muscle-edit-dialog/exercise-muscle-edit-dialog.component';

@Component({
  selector: 'app-exercise-icon-index',
  imports: [
    ReactiveFormsModule,
    TableComponent,
    ExerciseMuscleEditDialogComponent,
  ],
  templateUrl: './exercise-muscle-group-index.component.html',
  styleUrl: './exercise-muscle-group-index.component.css',
  providers: [
    { provide: CRUD_SERVICE_TOKEN, useExisting: ExerciseMuscleService },
  ],
})
export class ExerciseMuscleIndexComponent {
  columnsHeader = ['imgUrl', 'name', 'actions'];
}
