import { IEntity } from '../../../core/types/app.type';
import { IExercise } from '../../exercise/types/exercise.type';
import { ISet } from '../../set/models/iSet';

export interface IProgramExercise extends IEntity {
  exercise: IExercise;
  order: number; // Order of the exercise in the program
  sets: ISet[]; // List of sets for the exercise
  note?: string; // Note for the exercise in the program
}
