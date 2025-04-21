export interface IExerciseMuscleGroup {
  id?: string;
  name?: string;
  imgUrl?: string;
}

export interface IExerciseMuscleGroupDTO extends IExerciseMuscleGroup {
  file?: File;
}
