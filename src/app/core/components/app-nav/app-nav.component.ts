import {
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';

import { IAppPath } from '../../types/app.type';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [
    RouterModule,
    RouterLink,
    RouterModule,
    RouterLinkActive,
    NgComponentOutlet,
    NgClass,
  ],
  templateUrl: './app-nav.component.html',
  styleUrl: './app-nav.component.css',
})
export class AppNavComponent implements OnInit {
  @Input({ required: true })
  paths: IAppPath[] = [];
  @Input()
  isGridCols: boolean = true;
  @Input()
  isBGColor: boolean = false;
  @Input()
  style: string = 'highlight';

  router = inject(Router);

  getIconComponent(path: IAppPath) {
    return path.icon;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
      });
  }
}
