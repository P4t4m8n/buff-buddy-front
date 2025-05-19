import {
  IEntityDTO,
  IEntityEditDTO,
  TDayOfWeek,
} from '../../../core/types/app.type';
import { IExercise } from '../../exercise/types/exercise.type';
import { ICoreSetDTO, ICoreSetEditDTO } from '../../set/models/iSet';

interface IBaseProgramExercise {
  order: number; // Order of the exercise in the program
  note?: string; // Note for the exercise in the program
  daysOfWeek?: TDayOfWeek[];
}

export interface IProgramExerciseDto extends IBaseProgramExercise, IEntityDTO {
  exercise: IExercise;
  sets: ICoreSetDTO[]; // List of sets for the exercise
}

export interface IProgramExerciseEditDTO
  extends IBaseProgramExercise,
    IEntityEditDTO {
  programId?: string; // Foreign key to Program
  exerciseId: string; // Foreign key to Exercise
  sets: ICoreSetEditDTO[]; // List of sets for the exercise
}
