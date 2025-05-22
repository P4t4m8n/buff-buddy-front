import { IEntityDTO, IEntityEditDTO } from '../../../core/types/app.type';

export interface ICoreSetDTO extends IEntityDTO {
  reps: number; // Target number of repetitions for the set
  weight: number; // Weight lifted in kg
  restTime: number; // Rest time in seconds before the next set
  order: number; // Order of the set in the exercise
  isWarmup: boolean; // Indicates if the set was a warmup set
}

export interface ICoreSetEditDTO
  extends Omit<ICoreSetDTO, 'id'>,
    IEntityEditDTO {
  programExerciseId?: string; // Foreign key to ProgramExercise
}

export interface IUserSetDTO extends IEntityDTO {
  reps: number; // Actual number of repetitions performed
  weight: number; // Actual weight lifted in kg
  restTime: number; // Actual rest time in seconds before the next set
  isCompleted: boolean; // Indicates if the set was completed
  isMuscleFailure: boolean; // Indicates if the set was a muscle failure
  isJointPain: boolean; // Indicates if the set was a joint part
  coreSet?: ICoreSetDTO; // Reference to the core set associated with this user set
}

export interface IUserSetEditDTO
  extends Omit<IUserSetDTO, 'id' | 'coreSet'>,
    IEntityEditDTO {
  coreSetId?: string; // Foreign key to CoreSet
}
