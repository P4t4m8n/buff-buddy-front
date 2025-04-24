import { Component, inject } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { IExercise } from '../../types/exercise.type';
import { IPaginationDTO } from '../../../../core/components/pagination/pagination-dto';
import { HttpResponse } from '@angular/common/http';
import { TableComponent } from '../../../../core/components/table/table.component';
import { CRUD_SERVICE_TOKEN } from '../../../../core/providers/providers';
import { ExerciseEditDialogComponent } from '../../components/exercise-edit-dialog/exercise-edit-dialog.component';

@Component({
  selector: 'app-exercise-index',
  imports: [TableComponent, ExerciseEditDialogComponent],
  templateUrl: './exercise-index.component.html',
  styleUrl: './exercise-index.component.css',
  providers: [{ provide: CRUD_SERVICE_TOKEN, useExisting: ExerciseService }],
})
export class ExerciseIndexComponent {
  exerciseService = inject(ExerciseService);
  exercises: IExercise[] = [];
  pagination: IPaginationDTO = {
    page: 1,
    recordsPerPage: 10,
  };
  totalRecords: number = 0;

  columnsHeaders = [
    'name',
    'youtubeUrl',
    'type',
    'equipment',
    'muscle',
    'actions',
  ];

  editDialogType = ExerciseEditDialogComponent;

  constructor() {
    this.loadItems();
  }

  loadItems() {
    this.exerciseService
      .get(this.pagination)
      .subscribe((res: HttpResponse<IExercise[]>) => {
        this.exercises = res.body || [];
        this.totalRecords = Number(res.headers.get('total-count'));
      });
  }

  onItemSave() {
    this.loadItems();
  }
}
