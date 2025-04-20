import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExerciseIconService } from '../../services/exercise-icon.service';
import { IExerciseIcon, IExerciseIconDTO } from '../../models/exerciseIcon';
import { IErrorMessage } from '../../../../../core/types/app.type';
import { ExerciseIconEditDialogComponent } from '../../components/exercise-icon-edit-dialog/exercise-icon-edit-dialog.component';
import { TableComponent } from '../../../../../core/components/table/table.component';
import { CRUD_SERVICE_TOKEN } from '../../../../../core/providers/providers';

@Component({
  selector: 'app-exercise-icon-index',
  imports: [
    ReactiveFormsModule,
    ExerciseIconEditDialogComponent,
    TableComponent,
  ],
  templateUrl: './exercise-icon-index.component.html',
  styleUrl: './exercise-icon-index.component.css',
  providers: [
    { provide: CRUD_SERVICE_TOKEN, useExisting: ExerciseIconService },
  ],
})
export class ExerciseIconIndexComponent {
  columnsHeader = ['imgUrl', 'name', 'actions'];
}
