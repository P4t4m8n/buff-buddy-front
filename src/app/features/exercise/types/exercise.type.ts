import { TEntity } from '../../../core/types/app.type';

export type TExercise = TEntity & {
  id?: string;
  name?: string;
  youtubeUrl?: string;
  imgUrl?: string;
  type?: string;
  equipment?: string;
  targetMuscle?: string;
};

export type TExerciseDto = TExercise & {};
