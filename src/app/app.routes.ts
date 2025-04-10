import { Routes } from '@angular/router';
import { EXERCISE_PATHS, ROOT_PATHS } from './core/constants/path.constants';
import { HomeComponent } from './features/home/home.component';
import { ProgramComponent } from './features/program/program.component';
import { ProgramExerciseComponent } from './features/program-exercise/program-exercise.component';
import { Error404Component } from './core/components/error404/error404.component';
import { ExerciseIndexComponent } from './features/exercise/pages/exercise-index/exercise-index.component';
import { ExerciseDetailsComponent } from './features/exercise/pages/exercise-details/exercise-details.component';

export const routes: Routes = [
  { path: ROOT_PATHS.home, component: HomeComponent },
  { path: ROOT_PATHS.programs, component: ProgramComponent },
  { path: ROOT_PATHS.programsExercise, component: ProgramExerciseComponent },
  {
    path: ROOT_PATHS.exercise,
    component: ExerciseIndexComponent,
    children: [
      {
        path: EXERCISE_PATHS.details,
        component: ExerciseDetailsComponent,
      },
    ],
  },
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '404' },
];
