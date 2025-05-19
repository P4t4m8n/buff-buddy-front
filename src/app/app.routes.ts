import { Routes } from '@angular/router';
import {
  ADMIN_PATHS,
  EXERCISE_PATHS,
  ROOT_PATHS,
} from './core/constants/path.constants';
import { HomeComponent } from './features/home/home.component';
import { Error404Component } from './core/components/error404/error404.component';
import { ExerciseIndexComponent } from './features/exercise/pages/exercise-index/exercise-index.component';
import { ExerciseDetailsComponent } from './features/exercise/pages/exercise-details/exercise-details.component';
import { AdminIndexComponent } from './features/admin/admin-index/admin-index.component';
import { ExerciseMuscleIndexComponent } from './features/admin/exercise-info/exercise-muscle/views/exercise-muscle-index/exercise-muscle-index.component';
import { ExerciseEquipmentIndexComponent } from './features/admin/exercise-info/exercise-equipment/views/exercise-equipment-index/exercise-equipment-index.component';
import { ExerciseTypeIndexComponent } from './features/admin/exercise-info/exercise-type/views/exercise-type-index/exercise-type-index.component';
import { ProgramIndexComponent } from './features/program/pages/program-index/program-index.component';
import { ProgramEditComponent } from './features/program/components/program-edit/program-edit.component';
import { ProgramExerciseIndexComponent } from './features/program-exercise/pages/program-exercise-index/program-exercise-index.component';
import { ProgramDetailsComponent } from './features/program/pages/program-details/program-details.component';
import { ActiveProgramIndexComponent } from './features/active-program/pages/active-program-index/active-program-index.component';

export const routes: Routes = [
  { path: ROOT_PATHS.home, component: HomeComponent },
  { path: ROOT_PATHS.programIndex, component: ProgramIndexComponent },
  { path: ROOT_PATHS.activeProgram, component: ActiveProgramIndexComponent },
  {
    path: ROOT_PATHS.programIndex + ROOT_PATHS.programCreate,
    component: ProgramEditComponent,
  },
  {
    path: ROOT_PATHS.programDetails,
    component: ProgramDetailsComponent,
  },
  {
    path: ROOT_PATHS.programIndex + ROOT_PATHS.programEdit,
    component: ProgramEditComponent,
  },
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
  {
    path: ROOT_PATHS.programsExercise,
    component: ProgramExerciseIndexComponent,
  },
  {
    path: ROOT_PATHS.admin,
    component: AdminIndexComponent,
    children: [
      {
        path: ADMIN_PATHS.muscles,
        component: ExerciseMuscleIndexComponent,
      },
      {
        path: ADMIN_PATHS.equipment,
        component: ExerciseEquipmentIndexComponent,
      },
      {
        path: ADMIN_PATHS.type,
        component: ExerciseTypeIndexComponent,
      },
    ],
  },
  // { path: '404', component: Error404Component },
  // { path: '**', redirectTo: '404' },
];
