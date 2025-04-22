import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseEquipmentEditDialogComponent } from '../../components/exercise-equipment-edit-dialog/exercise-equipment-edit-dialog.component';
import { TableComponent } from '../../../../../../core/components/table/table.component';
import { CRUD_SERVICE_TOKEN } from '../../../../../../core/providers/providers';
import { ExerciseEquipmentService } from '../../services/exercise-equipment.service';

@Component({
  selector: 'app-exercise-equipment-index',
  imports: [
    ReactiveFormsModule,
    TableComponent,
    ExerciseEquipmentEditDialogComponent,
  ],
  templateUrl: './exercise-equipment-index.component.html',
  styleUrl: './exercise-equipment-index.component.css',
  providers: [
    {
      provide: CRUD_SERVICE_TOKEN,
      useExisting: ExerciseEquipmentService,
    },
  ],
})
export class ExerciseEquipmentIndexComponent {
  columnsHeader = ['imgUrl', 'name', 'actions'];
  editDialogType = ExerciseEquipmentEditDialogComponent;
}
