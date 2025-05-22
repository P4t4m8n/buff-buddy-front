import { IEntityDTO, IEntityEditDTO } from '../../../core/types/app.type';
import {
  IProgramExerciseDto,
  IProgramExerciseEditDTO,
} from '../../program-exercise/models/iexercise-program';

export interface IProgram extends IEntityDTO {
  name: string | null | undefined;
  note?: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  programExercises?: IProgramExerciseDto[];
}

export interface IProgramEditDTO
  extends Omit<IProgram, 'id' | 'programExercises'>,
    IEntityEditDTO {
  programExercises?: IProgramExerciseEditDTO[];
  //Only for Client to Server
  newProgramExercises?: IProgramExerciseEditDTO[];
  updateProgramExercises?: IProgramExerciseEditDTO[];
  deleteProgramExercises?: Partial<IProgramExerciseEditDTO>[];
}
