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
import { MatPaginatorImpl } from './material/mat-paginator';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from './material/custom-adapter';
import { MatPaginatorIntl } from '@angular/material/paginator';

export function tokenGetter() {
  console.log('hola mundo');
  return sessionStorage.getItem(environment.TOKEN_NAME);  
  // const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  // console.log(token,'asdasdas')
  // return token ? token.split('=')[1] : null;
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
    { provide: MatPaginatorIntl, useClass: MatPaginatorImpl },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    importProvidersFrom(
      NgxUiLoaderModule.forRoot({
        "bgsColor": "red",
        "bgsOpacity": 0.5,
        "bgsPosition": "bottom-right",
        "bgsSize": 60,
        "bgsType": "ball-spin-clockwise",
        "blur": 6,
        "delay": 0,
        "fastFadeOut": true,
        "fgsColor": "#3f51b5",
        "fgsPosition": "center-center",
        "fgsSize": 70,
        "fgsType": "ball-spin-clockwise",
        "gap": 24,
        "logoPosition": "center-center",
        "logoSize": 120,
        "logoUrl": "",
        "masterLoaderId": "master",
        "overlayBorderRadius": "0",
        "overlayColor": "rgba(40,40,40,0.21)",
        "pbColor": "#ffffff",
        "pbDirection": "ltr",
        "pbThickness": 5,
        "hasProgressBar": true,
        "text": "",
        "textColor": "#FFFFFF",
        "textPosition": "center-center",
        "maxTime": -1,
        "minTime": 300
    })
  ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
]
};
