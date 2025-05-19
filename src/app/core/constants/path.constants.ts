export const AUTH_PATHS = {
  base: 'auth',
  signin: 'sign-in',
  signup: 'sign-up',
};

export const NAV_PATHS = {
  home: '',
  activeProgram: 'active-program',
  programIndex: 'programs',
  programDetails: 'programs/:id',
  programCreate: '/create',
  programEdit: '/edit/:id',
  programsExercise: 'my-exercise',
  exercise: 'exercise',
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
