import { IEntity } from '../../../core/types/app.type';

export interface ISet extends IEntity {
  actualReps: number; // Actual number of repetitions performed
  targetReps: number; // Target number of repetitions for the set
  weight: number; // Weight lifted in kg
  restTime: number; // Rest time in seconds before the next set
  order: number; // Order of the set in the exercise
  isCompleted: boolean; // Indicates if the set was completed
  isMuscleFailure: boolean; // Indicates if the set was done to muscle failure
  isWarmup: boolean; // Indicates if the set was a warmup set
  jointPain: boolean; // Indicates if the user experienced joint pain during the set
}

export interface ISetEditDTO extends Omit<ISet, 'id'>, IEntity {
  programExerciseId?: string; // Foreign key to ProgramExercise
}
