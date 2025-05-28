import {
  IEntityDTO,
  IEntityEditDTO,
  TDayOfWeek,
} from '../../../core/types/app.type';
import { IExercise } from '../../exercise/types/exercise.type';
import {
  ICoreSetDTO,
  ICoreSetEditDTO,
  IUserSetDTO,
  IUserSetEditDTO,
} from '../../set/models/iSet';

interface IBaseProgramExercise {
  order: number;
  note?: string;
  daysOfWeek?: TDayOfWeek[];
}

export interface IProgramExerciseDto extends IBaseProgramExercise, IEntityDTO {
  exercise: IExercise;
  sets: ICoreSetDTO[];
}

export interface IWorkoutExercise extends IBaseProgramExercise, IEntityDTO {
  exercise: IExercise;

  sets: {
    coreSet: ICoreSetDTO;
    userSet: IUserSetEditDTO;
  }[];
}

export interface IProgramExerciseEditDTO
  extends IBaseProgramExercise,
    IEntityEditDTO {
  programId?: string;
  exerciseId: string;
  sets: ICoreSetEditDTO[];
}
