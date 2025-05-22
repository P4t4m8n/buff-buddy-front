import { TDayOfWeek } from '../../../core/types/app.type';
import { IActiveProgramExerciseDto, IProgramExerciseDto } from '../../program-exercise/models/iexercise-program';

export interface IActiveProgramData {
  exercises: IActiveProgramExerciseDto[];
  programName: string;
  day: TDayOfWeek;
}
