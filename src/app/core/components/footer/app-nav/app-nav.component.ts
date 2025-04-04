import { Component } from '@angular/core';
import { NAV_PATHS } from '../../../constants/path.constants';
import { ItemListComponent } from '../../item-list/item-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [ItemListComponent, RouterModule],
  templateUrl: './app-nav.component.html',
  styleUrl: './app-nav.component.css',
})
export class AppNavComponent {
  readonly navPaths = Object.entries(NAV_PATHS).map(([key, value]) => ({
    key,
    value,
  }));
}
