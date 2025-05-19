import { IEntityDTO, IEntityEditDTO } from '../../../core/types/app.type';
import {
  IProgramExerciseDto,
  IProgramExerciseEditDTO,
} from '../../program-exercise/models/iexercise-program';

export interface IProgram extends IEntityDTO {
  name: string | null | undefined; // Name of the program
  note?: string; // Note for the program
  startDate: Date; // Start date of the program
  endDate: Date; // End date of the program
  isActive: boolean; // Indicates if the program is active
  programExercises?: IProgramExerciseDto[]; // List of exercises in the program
}

export interface IProgramEditDTO
  extends Omit<IProgram, 'id' | 'programExercises'>,
    IEntityEditDTO {
  programExercises?: IProgramExerciseEditDTO[];
  //Only for Client to Server
  newProgramExercises?: IProgramExerciseEditDTO[]; // New exercises to be added
  updateProgramExercises?: IProgramExerciseEditDTO[]; // Updated exercises
  deleteProgramExercises?: Partial<IProgramExerciseEditDTO>[]; // Deleted exercises
}
