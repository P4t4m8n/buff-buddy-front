import { Component, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { IActiveProgramData } from '../../models/active-program-data';
import { ActiveProgramDataService } from '../../services/active-program-data.service';
import { YoutubePlayerComponent } from '../../../../core/components/youtube-player/youtube-player.component';

@Component({
  selector: 'app-active-program-index',
  imports: [YoutubePlayerComponent],
  templateUrl: './active-program-index.component.html',
  styleUrl: './active-program-index.component.css',
})
export class ActiveProgramIndexComponent implements OnInit {
  private activeProgramDataService = inject(ActiveProgramDataService);
  private router = inject(Router);

  activeData: Signal<IActiveProgramData | null> =
    this.activeProgramDataService.activeData;

  ngOnInit(): void {
    const currentData = this.activeData();
    console.log(" currentData:", currentData)
    if (!currentData) {
      console.warn('No active program data found (Signals).');
    }
  }
}
