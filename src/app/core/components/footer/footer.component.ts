import { Component } from '@angular/core';
import { AppNavComponent } from '../app-nav/app-nav.component';
import { APP_NAV_PATHS, NAV_PATHS } from '../../constants/path.constants';

@Component({
  selector: 'app-footer',
  imports: [AppNavComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly appPaths = APP_NAV_PATHS;
}
