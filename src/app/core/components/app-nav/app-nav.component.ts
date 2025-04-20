import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav',
  imports: [
    RouterModule,
    RouterLink,
    MatTabsModule,
    MatButtonModule,
    RouterModule,
    RouterLinkActive,
  ],
  templateUrl: './app-nav.component.html',
  styleUrl: './app-nav.component.css',
})
export class AppNavComponent implements OnInit {
  @Input({ required: true })
  paths: { [key: string]: string } = {};
  navPaths: { key: string; value: string }[] = [];

  ngOnInit(): void {
    this.navPaths = Object.entries(this.paths).map(([key, value]) => ({
      key,
      value,
    }));
  }
}
