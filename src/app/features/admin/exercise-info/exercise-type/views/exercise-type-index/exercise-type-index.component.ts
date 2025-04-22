import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../../../../../core/components/table/table.component';
import { CRUD_SERVICE_TOKEN } from '../../../../../../core/providers/providers';
import { ExerciseTypeService } from '../../services/exercise-type.service';
import { ExerciseTypeEditDialogComponent } from '../../exercise-type-edit-dialog/exercise-type-edit-dialog.component';

@Component({
  selector: 'app-exercise-type-index',
  imports: [
    ReactiveFormsModule,
    TableComponent,
    ExerciseTypeEditDialogComponent,
  ],
  templateUrl: './exercise-type-index.component.html',
  styleUrl: './exercise-type-index.component.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useExisting: ExerciseTypeService,
    },
  ],
})
export class ExerciseTypeIndexComponent {
  columnsHeader = ['imgUrl', 'name', 'actions'];
  editDialogType = ExerciseTypeEditDialogComponent;
}
