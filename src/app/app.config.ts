import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { employeereducer } from './store/reducers/employee.reducer';
import { EmployeeEffects } from './store/effects/employee.effect';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr(),
    provideStore({
      employees:employeereducer
    }),
    provideEffects(EmployeeEffects),
    provideStoreDevtools()
    ]
};
