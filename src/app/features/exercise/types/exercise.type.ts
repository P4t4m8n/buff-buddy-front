import { IEntity } from '../../../core/types/app.type';
import { IExerciseInfo } from '../../admin/exercise-info/models/exerciseInfo';

interface IExerciseBase extends IEntity {
  name?: string;
  youtubeUrl?: string;
}
export interface IExercise extends IExerciseBase {
  type?: IExerciseInfo;
  equipment?: IExerciseInfo;
  muscle?: IExerciseInfo;
}

export interface IExerciseDto extends IExerciseBase {
  exerciseTypeId?: string;
  exerciseEquipmentId?: string;
  exerciseMuscleId?: string;
}
