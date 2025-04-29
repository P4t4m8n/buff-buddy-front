import { IEntity } from '../../../core/types/app.type';
import { IProgramExercise } from '../../program-exercise/models/iProgram-exercise';

export interface IProgram extends IEntity {
  name: string; // Name of the program
  note?: string; // Note for the program
  startDate: Date; // Start date of the program
  endDate: Date; // End date of the program
  isActive: boolean; // Indicates if the program is active
  programExercises?: IProgramExercise[]; // List of exercises in the program
}
