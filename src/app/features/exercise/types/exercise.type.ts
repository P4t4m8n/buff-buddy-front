import { TEntity } from '../../../core/types/app.type';

export type TExercise = TEntity & {
  name?: string;
  youtubeUrl?: string;
  imgUrl?: string;
  type?: string;
  equipment?: string;
  targetMuscle?: string;
};
