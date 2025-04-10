import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IExercise } from '../../types/exercise.type';
import { ExerciseEditComponent } from '../../pages/exercise-edit/exercise-edit.component';
import { ExerciseService } from '../../services/exercise.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exercise-preview',
  imports: [ExerciseEditComponent, RouterLink],
  templateUrl: './exercise-preview.component.html',
  styleUrl: './exercise-preview.component.css',
})
export class ExercisePreviewComponent {
  @Input()
  exercise: IExercise | undefined;

  @Output()
  itemSaved = new EventEmitter<IExercise>();

  exerciseService = inject(ExerciseService);

  onDelete() {
    const { id } = this.exercise || {};
    if (!id) return;
    this.exerciseService.delete(id).subscribe({
      next: (res) => {
        this.itemSaved.emit();
      },
      error: (err) => {
        console.error(' err:', err);
      },
    });
  }

  onItemUpdate() {
    this.itemSaved.emit();
  }
}
