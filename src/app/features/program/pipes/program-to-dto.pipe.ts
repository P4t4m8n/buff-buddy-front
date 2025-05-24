import { Pipe, PipeTransform } from '@angular/core';
import { IProgram, IProgramEditDTO } from '../models/iProgram';
import { ProgramExerciseToDtoPipe } from '../../program-exercise/pipes/program-exercise-to-dto.pipe';

@Pipe({
  name: 'programToDto',
})
export class ProgramToDtoPipe implements PipeTransform {
  transform(value?: IProgram, ...args: unknown[]): IProgramEditDTO {
    if (!value) {
      console.error('ProgramToDtoPipe: value is undefined or null');
      return {} as IProgramEditDTO;
    }
    
    return {
      ...value,
      programExercises:
        value?.programExercises?.map((exercise) =>
          new ProgramExerciseToDtoPipe().transform(exercise)
        ) || [],
    };
  }
}
