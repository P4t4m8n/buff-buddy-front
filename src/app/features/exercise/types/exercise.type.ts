import { IEntity } from '../../../core/types/app.type';

export interface IExercise extends IEntity {
  id?: string;
  name?: string;
  youtubeUrl?: string;
  imgUrl?: string;
  type?: string;
  equipment?: string;
  targetMuscle?: string;
}

export interface IExerciseDto extends IEntity {}
