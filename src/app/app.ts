import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WhatsappBtnComponent } from './components/whatsapp-btn/whatsapp-btn';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WhatsappBtnComponent],
  template: `
    <router-outlet />
    <app-whatsapp-btn />
  `,
  styles: []
})
export class AppComponent {
  title = 'sove-web';
}
