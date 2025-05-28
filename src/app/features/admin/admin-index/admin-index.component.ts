import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ADMIN_VAV_PATHS } from '../../../core/constants/path.constants';
import { AppNavComponent } from '../../../core/components/app-nav/app-nav.component';

@Component({
  selector: 'app-admin-index',
  imports: [RouterOutlet, AppNavComponent],
  templateUrl: './admin-index.component.html',
  styleUrl: './admin-index.component.css',
})
export class AdminIndexComponent {
  readonly paths = ADMIN_VAV_PATHS;
  linkStyle = 'link-style';
}
