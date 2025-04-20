export interface IExerciseIcon {
  id?: string;
  name?: string;
  imgUrl?: string;
}

export interface IExerciseIconDTO extends IExerciseIcon {
  file?: File;
}
