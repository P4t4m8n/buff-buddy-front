import { Component } from '@angular/core';
import { AppNavComponent } from "./app-nav/app-nav.component";

@Component({
  selector: 'app-footer',
  imports: [AppNavComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
