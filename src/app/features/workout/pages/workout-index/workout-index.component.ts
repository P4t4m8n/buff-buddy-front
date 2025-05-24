import { Component, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutDataService } from '../../services/workout-data.service';
import { YoutubePlayerComponent } from '../../../../core/components/youtube-player/youtube-player.component';
import { FormBuilder } from '@angular/forms';
import { ActiveSetsComponent } from '../../components/active-sets/active-sets.component';
import { IUserSetEditDTO } from '../../../set/models/iSet';
import { IWorkout } from '../../models/workout.interface';
import { IWorkoutExercise } from '../../../program-exercise/models/iexercise-program';
import { MatButton } from '@angular/material/button';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-index',
  imports: [YoutubePlayerComponent, ActiveSetsComponent, MatButton],
  templateUrl: './workout-index.component.html',
  styleUrl: './workout-index.component.css',
})
export class WorkoutIndexComponent implements OnInit {
  private workoutDataService = inject(WorkoutDataService);
  private workoutService = inject(WorkoutService);
  private router = inject(Router);
  formBuilder = inject(FormBuilder);

  activeData: Signal<IWorkout | null> = this.workoutDataService.activeData;

  ngOnInit(): void {
    const currentData = this.activeData();
    if (!currentData) {
      console.warn('No workout data found');
    }
  }

  saveSet(set: IUserSetEditDTO) {
    if (!this.activeData()) {
      console.error('No workout data found');
      return;
    }

    const activeExercise: IWorkoutExercise[] =
      this.activeData()!.exercises!.map((e) => {
        return {
          ...e,
          sets: e.sets.map((s) => {
            return s.coreSet.id === set.coreSetId ? { ...s, userSet: set } : s;
          }),
        };
      });
    this.workoutDataService.setActiveData({
      ...this.activeData()!,
      exercises: activeExercise,
    });
  }

  completeWorkout() {
    try {
      const userSets: IUserSetEditDTO[] =
        this.activeData()?.exercises.flatMap((e) =>
          e.sets.map((s) => s.userSet)
        ) || [];
      this.workoutService.saveUserSets(userSets).subscribe({
        next: (res) => {
          if (res.ok) {
            this.workoutDataService.clearActiveData();
            this.router.navigate(['/']);
          }
        },
      });
    } catch (error) {
      console.error('Error completing workout:', error);
    }
  }
}
