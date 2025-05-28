import { IEntityDTO } from '../../../core/types/app.type';
import { IExerciseInfoEditDTO } from '../../admin/exercise-info/models/exerciseInfo';

interface IExerciseBase extends IEntityDTO {
  name?: string;
  youtubeUrl?: string;
}
export interface IExercise extends IExerciseBase {
  type?: IExerciseInfoEditDTO;
  equipment?: IExerciseInfoEditDTO;
  muscle?: IExerciseInfoEditDTO;
}

export interface IExerciseDto extends IExerciseBase {
  exerciseTypeId?: string;
  exerciseEquipmentId?: string;
  exerciseMuscleId?: string;
}
