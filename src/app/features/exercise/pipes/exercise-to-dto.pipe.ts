import { Pipe, PipeTransform } from '@angular/core';
import { IExercise, IExerciseDto } from '../types/exercise.type';

@Pipe({
  name: 'exerciseToDto',
})
export class ExerciseToDtoPipe implements PipeTransform {
  transform(value?: IExercise, ...args: unknown[]): IExerciseDto {
    return {
      id: value?.id || '',
      name: value?.name,
      youtubeUrl: value?.youtubeUrl,
      exerciseTypeId: value?.type?.id,
      exerciseEquipmentId: value?.equipment?.id,
      exerciseMuscleId: value?.muscle?.id,
    };
  }
}
