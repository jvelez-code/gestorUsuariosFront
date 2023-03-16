import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private logedIn = new BehaviorSubject<boolean>(false);
  private logeoEmpresa=  new BehaviorSubject<string>('--SIN EMPRESA--');
  private userToken=  new BehaviorSubject<string>('null') ;

  private empresaCambio = new Subject<string>();
  pseudonimo !: string;



  //reporteName : boolean = false;

  //private url:string = `${environment.HOST}`;
  //sudo kill $(sudo lsof -t -i:4200)


  header = new HttpHeaders();
  constructor( 
    private http: HttpClient,
    private router: Router 
    ) { 
      this.checktoken();
    }

    getEmpresaCambio(){
      return this.empresaCambio.asObservable();
    }
  
    setEmpresaCambio(empresa: string){
      this.empresaCambio.next(empresa);
      this.logeoEmpresa.next(empresa);
    }
  

    get isLogged(): Observable<boolean>{
      return this.logedIn.asObservable();
    }

    get isEmpresa(): Observable<string>{
      return this.logeoEmpresa.asObservable();
    }
    
     
    set setEmpresa(empresa: string){
       this.logeoEmpresa.next(empresa);
    }
         

    get userTokenValue(): string{
      return this.userToken.getValue();
    }


  


  
   cerrarSesion(): void {
     localStorage.removeItem('token');
     this.logedIn.next(false);
     this.router.navigate(['login']);
     this.userToken.next('null')
    // this.reporteName= false
    // console.log("Hola login", this.reporteName)
    
    //  sessionStorage.clear();
    //  this.router.navigate(['login']);
    //  return this.reporteName
   }

   private checktoken (): void{
     const userToken: any = localStorage.getItem('token');
     //const isExpired = helper.isTokenExpired(userToken);
     this.userToken.next(userToken);
     //set userisLogged = isExpired;
     //console.log('isExpired',isExpired)
     //isExpired ? this.cerrarSesion() : this.logedIn.next(true);
   };

   private savetoken (token: string ): void {
     localStorage.setItem('token', token);

   };
   
   private handlerError (err:any): Observable<never>{
     let errorMessage ='Ha ocurrido un error recibiendo Data'
     if(err){
       errorMessage = `Error: code ${err.errorMessage}`

     }
     window.alert(errorMessage)
     return throwError(errorMessage)
   };
 
}
