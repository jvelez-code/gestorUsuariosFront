import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { Rol } from 'src/app/_model/rol';
import { Usuarios } from 'src/app/_model/usuarios';
import { UsuariosMigraService } from 'src/app/_services/usuarios-migra.service';
import { JsonPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';

@Component({
    selector: 'app-usuario-edicion',
    templateUrl: './usuario-edicion.component.html',
    styleUrls: ['./usuario-edicion.component.scss'],
    standalone: true,
    imports: [MatCard, ReactiveFormsModule, MatFormField, MatInput, MatSelect, MatOption, MatButton, MatIcon, RouterLink, JsonPipe]
})
export class UsuarioEdicionComponent implements OnInit {

  formUsuarios!: FormGroup;
  id!: number;
  edicion!: boolean;
  fecha: Date = new Date();
  activo :boolean = true;
  fechaSeleccionada: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuariosMigraService: UsuariosMigraService,
    private fb : FormBuilder,
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id =data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  get f() { return this.formUsuarios.controls; }


  crearFormulario(){
    this.formUsuarios = this.fb.group({
      'idUsuario': new FormControl(0),
      'enabled': new FormControl(''),
      'fechaCambio': new FormControl(''),
      'password': new FormControl(''),
      'email': new FormControl(''),
      'roles': new FormControl(''),
      'username': new FormControl(''),
      'failed': new FormControl(''),
      'fechaActu': new FormControl(''),
      'fechaCreacion': new FormControl('')
    })
  }



  private initForm() {
    if (this.edicion) {

      this.usuariosMigraService.listarPorId(this.id).subscribe(data => {

        this.formUsuarios = this.fb.group({
          'idUsuario': new FormControl(data.idUsuario),
          'enabled': new FormControl(data.enabled),
          'fechaCambio': new FormControl(data.fechaCambio),
          'email': new FormControl(data.email),
          'roles': new FormControl(data.roles[0].idRol), 
          'username': new FormControl(data.username),
          'failed': new FormControl(data.failed),
          'password': new FormControl(data.password),
          'fechaActu': new FormControl(data.fechaActualizacion),
          'fechaCreacion': new FormControl(data.fechaCreacion),
        })
      });
    } else { 
      let fechaCambio = moment(this.fechaSeleccionada);
      fechaCambio.add(3,'months');

      this.formUsuarios = this.fb.group({
        'idUsuario': new FormControl(0),
        'enabled': new FormControl(this.activo),
        'fechaCambio': new FormControl(moment(fechaCambio).format('YYYY-MM-DD HH:mm:ss')),
        'password': new FormControl('$2a$10$ju20i95JTDkRa7Sua63JWOChSBc0MNFtG/6Sps2ahFFqN.HCCUMW.'),
        'email': new FormControl('@jaimetorres.net'),
        'roles': new FormControl(''),
        'username': new FormControl(''),
        'failed': new FormControl('0'),
        'fechaActu': new FormControl(moment(this.fechaSeleccionada).format('YYYY-MM-DD HH:mm:ss')),
        'fechaCreacion': new FormControl(moment(this.fechaSeleccionada).format('YYYY-MM-DD HH:mm:ss'))
      })
    }
  }


  operar() {

    if (this.formUsuarios.invalid) { return; }
    
    let usuarios = new Usuarios();
    usuarios.enabled = this.formUsuarios.value['enabled'];
    usuarios.fechaCambio =  this.formUsuarios.value['fechaCambio'];
    usuarios.password = this.formUsuarios.value['password'];
    usuarios.email = this.formUsuarios.value['email'];
    usuarios.roles = [
      {
        idRol: this.formUsuarios.value['roles']
      }
    ];
    usuarios.username=  this.formUsuarios.value['username'];
    usuarios.failed = this.formUsuarios.value['failed'];    
    usuarios.fechaActualizacion = this.formUsuarios.value['fechaActu'];
    usuarios.fechaCreacion = this.formUsuarios.value['fechaCreacion'];

    if (this.edicion) {
      //PRACTICA IDEAL
      this.usuariosMigraService.modificar(usuarios).pipe(switchMap(() => {
        return this.usuariosMigraService.listar();
      })).subscribe(data => {
        this.usuariosMigraService.setUsuariosCambio(data);
        this.usuariosMigraService.setMensajecambio('SE MODIFICÓ');
      });
    } else {
          this.usuariosMigraService.registrar(usuarios).subscribe(() => {
          this.usuariosMigraService.listar().subscribe(data => {
          this.usuariosMigraService.setUsuariosCambio(data);
          this.usuariosMigraService.setMensajecambio('SE REGISTRÓ');
        });
      });
    }

    this.router.navigate(['gestionUsuarios']);
  }

}
