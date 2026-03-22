import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { HeroComponent } from '../../components/hero/hero';
import { ServiciosComponent } from '../../components/servicios/servicios';
import { GaleriaComponent } from '../../components/galeria/galeria';
import { NosotrosComponent } from '../../components/nosotros/nosotros';
import { ContactoComponent } from '../../components/contacto/contacto';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ServiciosComponent,
    GaleriaComponent,
    NosotrosComponent,
    ContactoComponent,
    FooterComponent
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-servicios />
      <app-galeria />
      <app-nosotros />
      <app-contacto />
    </main>
    <app-footer />
  `,
  styles: []
})
export class HomeComponent {}
