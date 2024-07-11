import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable, OnInit } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs'; 
import { tap, catchError, retry, finalize } from 'rxjs/operators';
import { UsuarioService } from '../_services/usuario.service';
import { LoginService } from '../_services/login.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
    providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor {

    private usurioLogin !: string;

    constructor(
        private snackBar: MatSnackBar, 
        private router : Router,
        private usuarioService : UsuarioService,
        private loginService : LoginService,
        private ngxUiLoaderService: NgxUiLoaderService
) {}



    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const excludedUrls = [
            '/askEstadoExtensiones/buscaraAgente',
            '/reporContact/monitoreo',
            '/askEstadoExtensiones/buscaraAgente',
            '/clientes/buscarAsterisk'
          ];

        const isExcluded = excludedUrls.some(url => request.url.includes(url));

        if (isExcluded) {
            return next.handle(request);
          }

        this.ngxUiLoaderService.start();
        return next.handle(request).pipe(retry(environment.REINTENTOS)).pipe(finalize(()=>this.ngxUiLoaderService.stop())).
            pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        throw new Error(event.body.errorMessage);
                    }/*else{
                        this.snackBar.open("EXITO", 'AVISO', { duration: 5000 });    
                    }*/
                }
            })).pipe(catchError((err) => {        
                this.loginService.getUsuariosCambio().subscribe(data =>{
                    this.usurioLogin = data;
                });        
                //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                if (err.status === 400) {
                    this.snackBar.open('Usuario o Contraseña invalida', 'ERROR 400', { duration: 5000 });
                    const parametrosDTO = { loginAgente: this.usurioLogin };
                    this.usuarioService.intentosFallidos(parametrosDTO).subscribe();
                }
                else if (err.status === 404){
                    this.snackBar.open('No existe el recurso', 'ERROR 404', { duration: 5000 });
                }
                else if (err.status === 403) {
                    this.snackBar.open(err.error.error_description, 'ERROR 403', { duration: 5000 });
                    //sessionStorage.clear();
                    //this.router.navigate(['/login']);
                }
                else if (err.status === 500) {
                    this.snackBar.open(err.error.mensaje, 'ERROR 500', { duration: 5000 });
                } else {
                    this.snackBar.open(err.error.mensaje, 'ERROR', { duration: 5000 });
                }
                return EMPTY;
            }));
    }
}