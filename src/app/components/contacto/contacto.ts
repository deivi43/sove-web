import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="contacto" id="contacto">
      <div class="container">
        <div class="contacto-grid">
          <div class="contacto-info">
            <span class="section-label">// Contáctanos</span>
            <h2 class="section-title">¿Listo para un ambiente más seguro?</h2>
            <p>
              Escríbenos o llámanos. Atendemos en Bogotá y sus alrededores.
              Respuesta en menos de 24 horas.
            </p>
            <div class="info-items">
              <div class="info-item" *ngFor="let item of infoItems">
                <span class="info-icon">{{ item.icon }}</span>
                <div>
                  <span class="info-label">{{ item.label }}</span>
                  <span class="info-value">{{ item.value }}</span>
                </div>
              </div>
            </div>
            <a href="https://wa.me/573042004948?text=Hola%20SOVE,%20necesito%20información%20sobre%20sus%20servicios"
              target="_blank"
              class="whatsapp-cta">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
              Escribir por WhatsApp
            </a>
          </div>
          <div class="contacto-card">
            <h3>Solicitar cotización</h3>
            <p>Cuéntanos qué necesitas y te respondemos a la brevedad.</p>
            <div class="form-group">
              <label>Nombre completo</label>
              <input type="text" placeholder="Tu nombre" [(ngModel)]="nombre" />
            </div>
            <div class="form-group">
              <label>Teléfono / WhatsApp</label>
              <input type="tel" placeholder="300 000 0000" [(ngModel)]="telefono" />
            </div>
            <div class="form-group">
              <label>Servicio de interés</label>
              <select [(ngModel)]="servicio">
                <option value="">Seleccionar servicio</option>
                <option>Fumigación</option>
                <option>Desratización</option>
                <option>Desinfección</option>
                <option>Lavado de tanques</option>
                <option>Extintores</option>
                <option>Marcación industrial</option>
                <option>Otro</option>
              </select>
            </div>
            <div class="form-group">
              <label>Mensaje</label>
              <textarea
                placeholder="Cuéntanos más sobre lo que necesitas..."
                [(ngModel)]="mensaje"
                rows="4">
              </textarea>
            </div>
            <button
              class="btn-primary"
              style="width:100%; justify-content:center"
              (click)="enviar()">
              Enviar por WhatsApp 📲
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contacto {
      padding: 100px 0;
      background: linear-gradient(135deg, #1a3a2a 0%, #1a2744 100%);
    }
    .contacto-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: start;
    }
    .contacto-info {
      .section-label { color: #52b788; }
      .section-title { color: white; }
      p { color: rgba(255,255,255,0.75); line-height: 1.7; margin-bottom: 32px; }
    }
    .info-items {
      display: flex; flex-direction: column; gap: 20px;
      margin-bottom: 32px;
    }
    .info-item {
      display: flex; gap: 16px; align-items: center;
      .info-icon { font-size: 1.5rem; flex-shrink: 0; }
      .info-label {
        display: block; color: rgba(255,255,255,0.5);
        font-size: 0.78rem; letter-spacing: 1px;
        text-transform: uppercase; margin-bottom: 2px;
      }
      .info-value { color: white; font-weight: 500; }
    }
    .whatsapp-cta {
      display: inline-flex; align-items: center; gap: 10px;
      background: #25D366; color: white;
      padding: 14px 24px; border-radius: 12px;
      font-weight: 600; transition: all 0.3s;
      img { width: 24px; height: 24px; }
      &:hover { background: #128C7E; transform: translateY(-2px); }
    }
    .contacto-card {
      background: white; border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      h3 { font-size: 1.4rem; color: #1a3a2a; margin-bottom: 8px; }
      p { color: #666; margin-bottom: 24px; font-size: 0.9rem; }
    }
    .form-group {
      margin-bottom: 16px;
      label {
        display: block; font-weight: 600;
        font-size: 0.85rem; color: #333;
        margin-bottom: 6px;
      }
      input, select, textarea {
        width: 100%; padding: 12px 16px;
        border: 2px solid #e0e0e0; border-radius: 10px;
        font-family: 'Raleway', sans-serif;
        font-size: 0.9rem; transition: border-color 0.2s;
        outline: none;
        &:focus { border-color: #2d6a4f; }
      }
      textarea { resize: vertical; }
    }
    @media (max-width: 768px) {
      .contacto-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ContactoComponent {
  nombre = '';
  telefono = '';
  servicio = '';
  mensaje = '';

  infoItems = [
    { icon: '📍', label: 'Ubicación', value: 'Bogotá, Colombia' },
    { icon: '📞', label: 'Teléfono / WhatsApp', value: '+57 304 200 4948' },
    { icon: '✉️', label: 'Correo electrónico', value: 'soporte.sove@gmail.com' },
    { icon: '🕐', label: 'Horario de atención', value: 'Lunes a Sábado 7am - 6pm' },
  ];

  enviar() {
    const texto = `Hola SOVE, mi nombre es ${this.nombre}.%0ATeléfono: ${this.telefono}.%0AServicio: ${this.servicio}.%0AMensaje: ${this.mensaje}`;
    window.open(`https://wa.me/573042004948?text=${texto}`, '_blank');
  }
}
