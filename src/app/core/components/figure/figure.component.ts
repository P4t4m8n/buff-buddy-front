import { Component, Input } from '@angular/core';
import { IExerciseInfo } from '../../../features/admin/exercise-info/models/exerciseInfo';
import { FirstCharToUpperCasePipe } from '../../pipes/first-char-to-upper-case.pipe';

@Component({
  selector: 'app-figure',
  imports: [FirstCharToUpperCasePipe],
  templateUrl: './figure.component.html',
  styleUrl: './figure.component.css',
})
export class FigureComponent<T extends IExerciseInfo & { key: string }> {
  @Input({ required: true }) item!: T;
}
