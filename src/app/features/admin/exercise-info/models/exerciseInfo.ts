import { IEntity } from "../../../../core/types/app.type";

export interface IExerciseInfo extends IEntity {
  id?: string;
  name?: string;
  imgUrl?: string;
}

export interface IExerciseInfoDTO extends IExerciseInfo {
  file?: File;
}
