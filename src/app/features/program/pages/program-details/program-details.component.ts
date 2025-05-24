import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { IProgram } from '../../models/iProgram';
import { DAY_OF_WEEK, TDayOfWeek } from '../../../../core/types/app.type';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { WorkoutDataService } from '../../../workout/services/workout-data.service';
import { IWorkout } from '../../../workout/models/workout.interface';
import { IWorkoutExercise } from '../../../program-exercise/models/iexercise-program';

@Component({
  selector: 'app-program-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './program-details.component.html',
  styleUrl: './program-details.component.css',
})
export class ProgramDetailsComponent {
  programService = inject(ProgramService);
  workoutDataService = inject(WorkoutDataService);
  program: IProgram | null = null;
  daysOfWeek = DAY_OF_WEEK;
  router = inject(Router);
  @Input()
  set id(id: string) {
    if (!id) {
      console.error('id is null');
      return;
    }

    this.programService.getById(id).subscribe((program) => {
      this.program = program;
    });
  }

  hasExercisesForDay(day: TDayOfWeek): boolean {
    if (!this.program) {
      return false;
    }

    if (!this.program.programExercises) {
      return false;
    }

    return this.program.programExercises.some((pe) =>
      (pe.daysOfWeek || []).includes(day)
    );
  }

  startExercises(day: TDayOfWeek): void {
    if (!this.program || !this.program.programExercises) {
      return;
    }

    const exercisesForDay: IWorkoutExercise[] = this.program.programExercises
      .filter((pe) => pe.daysOfWeek?.includes(day))
      .map((pe) => ({
        ...pe,
        sets: pe.sets.map((s) => {
          return {
            coreSet: { ...s },
            userSet: {
              reps: 0,
              weight: 0,
              restTime: 0,
              isCompleted: false,
              isMuscleFailure: false,
              isJointPain: false,
              coreSetId: s.id,
              programExerciseId: pe.id,
            },
          };
        }),
      }));

    if (exercisesForDay.length > 0) {
      this.workoutDataService.setActiveData({
        exercises: exercisesForDay,
        programName: this.program.name || 'exercise',
        day: day,
      });
      this.router.navigate(['/active-program']);
    } else {
      console.warn(`No exercises found for ${day} to start.`);
    }
  }
}
