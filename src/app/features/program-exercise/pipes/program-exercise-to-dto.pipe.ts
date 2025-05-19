import { Pipe, PipeTransform } from '@angular/core';
import { IProgram } from '../../program/models/iProgram';
import {
  IProgramExerciseDto,
  IProgramExerciseEditDTO,
} from '../models/iexercise-program';
import { TDayOfWeek } from '../../../core/types/app.type';

@Pipe({
  name: 'programExerciseToDto',
})
export class ProgramExerciseToDtoPipe implements PipeTransform {
  transform(
    value?: IProgramExerciseDto,
    ...args: unknown[]
  ): IProgramExerciseEditDTO {
    if (!value) {
      return {} as IProgramExerciseEditDTO;
    }
    return {
      id: value.id,
      exerciseId: value.exercise.id,
      sets: value.sets,
      order: value.order,
      note: value.note,
      daysOfWeek: value.daysOfWeek as TDayOfWeek[],
    };
  }
}
