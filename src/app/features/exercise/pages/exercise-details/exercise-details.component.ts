import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IExercise } from '../../types/exercise.type';
import { ExerciseService } from '../../services/exercise.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-exercise-details',
  imports: [],
  templateUrl: './exercise-details.component.html',
  styleUrl: './exercise-details.component.css',
})
export class ExerciseDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  id: string | undefined | null;
  item: IExercise | undefined | null;
  exerciseService = inject(ExerciseService);

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = params.get('id');

          if (this.id) {
            return this.exerciseService.getById(this.id);
          } else {
            return of(null);
          }
        })
      )
      .subscribe({
        next: (res) => {
          this.item = res;
        },
        error: (err) => {},
      });
  }
}
