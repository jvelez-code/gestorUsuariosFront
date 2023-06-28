import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/_services/login.service';
import { ValidadoresService } from 'src/app/_services/validadores.service';


@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  formRecuperar!: FormGroup;
  token!: string;
  mensaje!: string;
  error!: string;
  rpta!: number;
  tokenValido!: boolean;
  validacionPass1 = `- Debe tener de 8 a 15 caracteres.`                                      
  validacionPass2 = `- Debe tener una mayuscula.`
  validacionPass3 = `- Debe tener un número.`
  validacionPass4 = `- Debe tener un caracter especial (!@#$%^&*).`;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validadoresService: ValidadoresService,
    private route: ActivatedRoute,
    private loginService : LoginService
  ) { }


  ngOnInit() {

    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,15}$/;
    const passwordPattern = Validators.pattern(regex);
    this.formRecuperar = this.fb.group({
      password: ['', [Validators.required,passwordPattern]],
      confirmPassword: ['',[Validators.required]]
    },{
      validators: this.validadoresService.passwordsIguales('password','confirmPassword')
    })


    //[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$
    ///^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,15}$/

    this.route.params.subscribe((params : Params) => {
      this.token = params['token'];
      this.loginService.verificarTokenReset(this.token).subscribe(data => {
      
        if(data === 1){
          this.tokenValido = true;
        }else{
          this.tokenValido = false;
          setTimeout( () => {
            this.router.navigate(['login']);
          }, 2000)
        }
      });
    })
  }

  get passwordNoValido() {
    return this.formRecuperar.get('password')?.invalid && this.formRecuperar.get('password')?.touched
  }

  get confirmPasswordNoValido() {
    const pass1 = this.formRecuperar.get('password')?.value;
    const pass2 = this.formRecuperar.get('confirmPassword')?.value;
    return (pass1===pass2) ? false : true
  }

  onSubmit(){
    let clave: string = this.formRecuperar.value.confirmPassword;
    this.loginService.restablecer(this.token, clave).subscribe(data => {
    this.mensaje = 'Se cambio la contraseña';

        setTimeout(() => {          
          this.router.navigate(['login']);
        }, 2000);
    });
  }

}