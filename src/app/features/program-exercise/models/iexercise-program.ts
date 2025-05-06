import { IEntity, IEntityDTO } from '../../../core/types/app.type';
import { IExercise } from '../../exercise/types/exercise.type';
import { ISet, ISetEditDTO } from '../../set/models/iSet';

interface IBaseProgramExercise {
  order: number; // Order of the exercise in the program
  note?: string; // Note for the exercise in the program
}

export interface IProgramExercise extends IBaseProgramExercise, IEntity {
  exercise: IExercise;
  sets: ISet[]; // List of sets for the exercise
}

export interface IProgramExerciseEditDTO
  extends IBaseProgramExercise,
    IEntityDTO {
  programId?: string; // Foreign key to Program
  exerciseId: string; // Foreign key to Exercise
  sets: ISetEditDTO[]; // List of sets for the exercise
}
