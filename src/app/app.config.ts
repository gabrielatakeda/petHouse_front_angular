import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations'; 
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideAnimations() // NECESSARIO PARA FAZER REQUISIÇÕES HTTP - AGE COMO UM RESTCONTROLLER DO JAVA
    //provideHttpClient(withInterceptors([meuhttpInterceptor])) //Habilitando interceptador para fazer a comunicaçãi
  ] 
  }