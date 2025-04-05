import { Component, Input } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { YoutubeUrlToIdPipe } from '../../pipes/youtube-url-to-id.pipe';

@Component({
  selector: 'app-youtube-player',
  imports: [YouTubePlayer, YoutubeUrlToIdPipe],
  templateUrl: './youtube-player.component.html',
  styleUrl: './youtube-player.component.css',
})
export class YoutubePlayerComponent {
  @Input()
  youtubeUrl: string | undefined = '';
}
