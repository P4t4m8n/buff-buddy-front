import { TDayOfWeek } from '../../../core/types/app.type';
import { IWorkoutExercise } from '../../program-exercise/models/iexercise-program';

export interface IWorkout {
  exercises: IWorkoutExercise[];
  programName: string;
  day: TDayOfWeek;
}
