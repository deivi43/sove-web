import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-btn',
  standalone: true,
  template: `
    <a
      href="https://wa.me/573042004948?text=Hola%20SOVE,%20necesito%20información%20sobre%20sus%20servicios"
      target="_blank"
      class="whatsapp-btn"
      aria-label="Contactar por WhatsApp">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
    </a>
  `,
  styles: [`
    .whatsapp-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #25D366;
      box-shadow: 0 4px 20px rgba(37,211,102,0.4);
      z-index: 9999;
      transition: all 0.3s ease;
      animation: pulse 2s infinite;
      img {
        width: 35px;
        height: 35px;
      }
      &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 28px rgba(37,211,102,0.6);
      }
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
      70% { box-shadow: 0 0 0 15px rgba(37,211,102,0); }
      100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
    }
  `]
})
export class WhatsappBtnComponent {}
