import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
//import { adminInterceptor } from './interceptors/admin.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { ServerErrorsInterceptor } from './shared/server-errors.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BnNgIdleService } from 'bn-ng-idle';
import { provideAnimations } from '@angular/platform-browser/animations';

export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserModule, MaterialModule, ReactiveFormsModule, FormsModule, RouterModule, NgxUiLoaderModule, JwtModule.forRoot({
        config: {
            tokenGetter: tokenGetter,
            //allowedDomains: ["10.1.0.231:9898"],
            allowedDomains: [environment.HOST.substring(7)],
            disallowedRoutes: [`http://${environment.HOST.substring(7)}/login/enviarCorreo`],
        },
    }), NgHcaptchaModule.forRoot({
        siteKey: '53b9bb7e-49a4-428f-ab81-5935daec8a8a',
        languageCode: 'es',
        //theme: 'dark' // añade esta opción para el tema oscuro
    })),
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorsInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: BnNgIdleService },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
]
};
