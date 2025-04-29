import { IEntity } from "../../../../core/types/app.type";

export interface IExerciseInfo extends IEntity {
  name?: string;
  imgUrl?: string;
}

export interface IExerciseInfoDTO extends IExerciseInfo {
  file?: File;
}
