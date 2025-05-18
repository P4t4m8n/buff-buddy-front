import { Component, Input, OnInit } from '@angular/core';
import { IExercise } from '../../types/exercise.type';
import { MatDialogModule } from '@angular/material/dialog';
import { YoutubePlayerComponent } from '../../../../core/components/youtube-player/youtube-player.component';
import { RemoveKeysPipe } from '../../../../core/pipes/remove-keys.pipe';
import { ObjectToArrayPipe } from '../../../../core/pipes/object-to-array.pipe';
import { FigureComponent } from '../../../../core/components/figure/figure.component';

@Component({
  selector: 'app-exercise-details-content',
  imports: [
    YoutubePlayerComponent,
    RemoveKeysPipe,
    ObjectToArrayPipe,
    FigureComponent,
    MatDialogModule,
  ],
  templateUrl: './exercise-details-content.component.html',
  styleUrl: './exercise-details-content.component.css',
})
export class ExerciseDetailsContentComponent {
  @Input()
  item?: IExercise | null = null;

  keysToRemove = ['id', 'name', 'youtubeUrl'];
}
