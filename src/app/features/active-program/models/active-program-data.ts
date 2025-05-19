import { TDayOfWeek } from '../../../core/types/app.type';
import { IProgramExerciseDto } from '../../program-exercise/models/iexercise-program';

export interface IActiveProgramData {
  exercises: IProgramExerciseDto[];
  programName: string;
  day: TDayOfWeek;
}
