export interface IExerciseMuscle {
  id?: string;
  name?: string;
  imgUrl?: string;
}

export interface IExerciseMuscleDTO extends IExerciseMuscle {
  file?: File;
}
