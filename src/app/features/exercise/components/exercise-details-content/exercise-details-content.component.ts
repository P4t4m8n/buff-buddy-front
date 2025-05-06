import { Component, Inject, Input, input } from '@angular/core';
import { IExercise } from '../../types/exercise.type';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { YoutubePlayerComponent } from "../../../../core/components/youtube-player/youtube-player.component";
import { YoutubeUrlToIdPipe } from '../../../../core/pipes/youtube-url-to-id.pipe';
import { RemoveKeysPipe } from '../../../../core/pipes/remove-keys.pipe';
import { ObjectToArrayPipe } from '../../../../core/pipes/object-to-array.pipe';
import { FigureComponent } from "../../../../core/components/figure/figure.component";
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-exercise-details-content',
  imports: [YoutubePlayerComponent, RemoveKeysPipe, ObjectToArrayPipe, FigureComponent,MatDialogModule,MatButton],
  templateUrl: './exercise-details-content.component.html',
  styleUrl: './exercise-details-content.component.css',
})
export class ExerciseDetailsContentComponent {
  item!: IExercise;
  constructor(@Inject(MAT_DIALOG_DATA) public data: IExercise) {
    this.item = data;
  }

  keysToRemove=['id','name','youtubeUrl']
}
