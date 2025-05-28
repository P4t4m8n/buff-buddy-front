import { AdminIconComponent } from '../components/icons/admin-icon/admin-icon.component';
import { ExerciseIconComponent } from '../components/icons/exercise-icon/exercise-icon.component';
import { HomeIconComponent } from '../components/icons/home-icon/home-icon.component';
import { ProfileIconComponent } from '../components/icons/profile-icon/profile-icon.component';
import { ProgramIconComponent } from '../components/icons/program-icon/program-icon.component';
import { WorkoutIconComponent } from '../components/icons/workout-icon/workout-icon.component';
import { IAppPath } from '../types/app.type';

export const AUTH_PATHS = {
  base: 'auth',
  signin: 'sign-in',
  signup: 'sign-up',
};

export const APP_NAV_PATHS: IAppPath[] = [
  { label: 'home', path: '/', icon: HomeIconComponent },
  { label: 'workouts', path: 'workouts', icon: WorkoutIconComponent },
  { label: 'exercises', path: 'exercises', icon: ExerciseIconComponent },
  { label: 'programs', path: 'programs', icon: ProgramIconComponent },
  { label: 'profile', path: 'profile', icon: ProfileIconComponent },
  { label: 'admin', path: 'admin', icon: AdminIconComponent },
];
export const ADMIN_VAV_PATHS = [
  {
    path: 'exercise-muscles',
    label: 'muscles',
  },
  {
    path: 'exercise-equipment',
    label: 'equipment',
  },
  {
    path: 'exercise-type',
    label: 'exercise-type',
  },
];

export const NAV_PATHS = {
  home: '',
  workout: 'workouts',
  programIndex: 'programs',
  programDetails: 'programs/:id',
  programCreate: '/create',
  programEdit: '/edit/:id',
  programsExercise: 'my-exercise',
  exercise: 'exercises',
  profile: 'profile',
  admin: 'admin',
};
export const ROOT_PATHS = {
  ...NAV_PATHS,
  error404: '404',
};

export const EXERCISE_PATHS = {
  details: ':id',
};

export const ADMIN_PATHS = {
  muscles: 'exercise-muscles',
  equipment: 'exercise-equipment',
  type: 'exercise-type',
};
