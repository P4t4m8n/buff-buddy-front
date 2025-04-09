import { Component, inject } from '@angular/core';
import { ExerciseEditComponent } from '../exercise-edit/exercise-edit.component';
import { ExerciseService } from '../../services/exercise.service';
import { TExercise } from '../../types/exercise.type';
import { ItemListComponent } from "../../../../core/components/item-list/item-list.component";
import { ExercisePreviewComponent } from "../../components/exercise-preview/exercise-preview.component";

@Component({
  selector: 'app-exercise-index',
  imports: [ExerciseEditComponent, ItemListComponent, ExercisePreviewComponent],
  templateUrl: './exercise-index.component.html',
  styleUrl: './exercise-index.component.css',
})
export class ExerciseIndexComponent {
  exerciseService = inject(ExerciseService);
  exercises: TExercise[] = [];

  constructor() {
    this.exerciseService.get().subscribe((exercises) => {
      this.exercises = exercises;
      console.log(" this.exercises:", this.exercises)
    });
  }
}
