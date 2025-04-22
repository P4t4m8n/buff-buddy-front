import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseMuscleService } from '../../services/exercise-muscle.service';
import { ExerciseMuscleEditDialogComponent } from '../../components/exercise-muscle-edit-dialog/exercise-muscle-edit-dialog.component';
import { CRUD_SERVICE_TOKEN } from '../../../../../../core/providers/providers';
import { TableComponent } from '../../../../../../core/components/table/table.component';

@Component({
  selector: 'app-exercise-muscle-index',
  imports: [
    ReactiveFormsModule,
    TableComponent,
    ExerciseMuscleEditDialogComponent,
  ],
  templateUrl: './exercise-muscle-index.component.html',
  styleUrl: './exercise-muscle-index.component.css',
  providers: [
    { provide: CRUD_SERVICE_TOKEN, useExisting: ExerciseMuscleService },
  ],
})
export class ExerciseMuscleIndexComponent {
  columnsHeader = ['imgUrl', 'name', 'actions'];
  editDialogType = ExerciseMuscleEditDialogComponent;
}
