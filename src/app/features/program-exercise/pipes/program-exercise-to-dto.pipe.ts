import { Pipe, PipeTransform } from '@angular/core';
import { IProgram } from '../../program/models/iProgram';
import {
  IProgramExercise,
  IProgramExerciseEditDTO,
} from '../models/iexercise-program';

@Pipe({
  name: 'programExerciseToDto',
})
export class ProgramExerciseToDtoPipe implements PipeTransform {
  transform(
    value?: IProgramExercise,
    ...args: unknown[]
  ): IProgramExerciseEditDTO {
    if (!value) {
      return {} as IProgramExerciseEditDTO;
    }
    return {
      exerciseId: value.exercise.id,
      sets: value.sets,
      order: value.order,
      note: value.note,
    };
  }
}
