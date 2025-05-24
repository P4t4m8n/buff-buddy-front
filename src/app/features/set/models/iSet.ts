import { FormControl } from '@angular/forms';
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
  reps?: number | null; // Actual number of repetitions performed
  weight?: number | null; // Actual weight lifted in kg
  restTime?: number | null; // Actual rest time in seconds before the next set
  isCompleted?: boolean | null; // Indicates if the set was completed
  isFinished?: boolean | null; // Indicates if the set was "finished" (logged and completed for this session)
  isMuscleFailure?: boolean | null; // Indicates if the set was a muscle failure
  isJointPain?: boolean | null; // Indicates if the set was a joint part
  coreSet?: ICoreSetDTO; // Reference to the core set associated with this user set
}

export interface IUserSetEditDTO
  extends Omit<IUserSetDTO, 'id' | 'coreSet'>,
    IEntityEditDTO {
  coreSetId?: string; // Foreign key to CoreSet
  programExerciseId?: string;
}

export interface ISetFrom {
  reps: FormControl<number | null>;
  weight: FormControl<number | null>;
  restTime: FormControl<number | null>;
  isMuscleFailure: FormControl<boolean | null>;
  isJointPain: FormControl<boolean | null>;
  isCompleted: FormControl<boolean | null>; //Did user completed the set
  coreSetId: FormControl<string | null>;
}
