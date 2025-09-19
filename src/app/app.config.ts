import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // Para animações padrão
import { provideZoneChangeDetection } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations'; // Para desativar animações

import { routes } from './app.routes'; // Ajuste o caminho se necessário

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations() 
  ]
};