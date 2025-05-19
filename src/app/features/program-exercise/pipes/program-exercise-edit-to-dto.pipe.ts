import { Pipe, PipeTransform } from '@angular/core';
import {
  IProgramExerciseDto,
  IProgramExerciseEditDTO,
} from '../models/iexercise-program';
import { IExerciseDto } from '../../exercise/types/exercise.type';
import { ICoreSetDTO } from '../../set/models/iSet';
import { TDayOfWeek } from '../../../core/types/app.type';

@Pipe({
  name: 'programExerciseEditToDto',
})
export class ProgramExerciseEditToDtoPipe implements PipeTransform {
  transform(
    value: IProgramExerciseEditDTO,
    exercise: IExerciseDto
  ): IProgramExerciseDto {
    console.log(" value:", value)
    if (!value) {
      return {} as IProgramExerciseDto;
    }

    return {
      id: value.id!,
      exercise,
      sets: value.sets as ICoreSetDTO[],
      order: value.order,
      note: value.note,
      daysOfWeek: value.daysOfWeek as TDayOfWeek[],
    };
  }
}
