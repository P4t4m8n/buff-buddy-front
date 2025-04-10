import { Component, inject } from '@angular/core';
import { ExerciseEditComponent } from '../exercise-edit/exercise-edit.component';
import { ExerciseService } from '../../services/exercise.service';
import { IExercise } from '../../types/exercise.type';
import { ItemListComponent } from '../../../../core/components/item-list/item-list.component';
import { ExercisePreviewComponent } from '../../components/exercise-preview/exercise-preview.component';
import { IPaginationDTO } from '../../../../core/components/pagination/pagination-dto';
import { HttpResponse } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-exercise-index',
  imports: [
    ExerciseEditComponent,
    ItemListComponent,
    ExercisePreviewComponent,
    RouterOutlet,
  ],
  templateUrl: './exercise-index.component.html',
  styleUrl: './exercise-index.component.css',
})
export class ExerciseIndexComponent {
  exerciseService = inject(ExerciseService);
  exercises: IExercise[] = [];
  pagination: IPaginationDTO = {
    page: 1,
    recordsPerPage: 10,
  };
  totalRecords: number = 0;

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
