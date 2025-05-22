import { Component, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { IActiveProgramData } from '../../models/active-program-data';
import { ActiveProgramDataService } from '../../services/active-program-data.service';
import { YoutubePlayerComponent } from '../../../../core/components/youtube-player/youtube-player.component';
import { MatInputComponent } from '../../../../core/components/form/mat-input/mat-input.component';
import { FormBuilder } from '@angular/forms';
import { ActiveSetsComponent } from '../../components/active-sets/active-sets.component';
import { IUserSetEditDTO } from '../../../set/models/iSet';

@Component({
  selector: 'app-active-program-index',
  imports: [YoutubePlayerComponent, ActiveSetsComponent],
  templateUrl: './active-program-index.component.html',
  styleUrl: './active-program-index.component.css',
})
export class ActiveProgramIndexComponent implements OnInit {
  private activeProgramDataService = inject(ActiveProgramDataService);
  private router = inject(Router);
  formBuilder = inject(FormBuilder);

  activeData: Signal<IActiveProgramData | null> =
    this.activeProgramDataService.activeData;

  ngOnInit(): void {
    const currentData = this.activeData();
    console.log(' currentData:', currentData);
    if (!currentData) {
      console.warn('No active program data found (Signals).');
    }
  }

  saveSet(set: IUserSetEditDTO) {
    console.log('Saving set:', set);
    // Implement the logic to save the set data
  }
}
