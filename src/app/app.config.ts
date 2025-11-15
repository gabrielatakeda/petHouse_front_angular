import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations'; 
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { meuhttpInterceptor } from './auth/http-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptors([meuhttpInterceptor])), //Toda requisição que acontecer, vai passar por essa classe para poder colocar o token no cabeçalho da requisição
    provideAnimations() // NECESSARIO PARA FAZER REQUISIÇÕES HTTP - AGE COMO UM RESTCONTROLLER DO JAVA
  ] 
  }