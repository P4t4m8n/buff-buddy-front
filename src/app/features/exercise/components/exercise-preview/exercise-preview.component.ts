import { Component, Input } from '@angular/core';
import { TExercise } from '../../types/exercise.type';

@Component({
  selector: 'app-exercise-preview',
  imports: [],
  templateUrl: './exercise-preview.component.html',
  styleUrl: './exercise-preview.component.css',
})
export class ExercisePreviewComponent {
  @Input()
  exercise: TExercise | undefined;
}
