import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations'; 
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
<<<<<<< HEAD

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideAnimations() ] // NECESSARIO PARA FAZER REQUISIÇÕES HTTP - AGE COMO UM RESTCONTROLLER DO JAVA

=======


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimations()]
>>>>>>> origin/joaoM
};
