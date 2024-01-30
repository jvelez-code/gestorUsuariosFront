import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { Rol } from 'src/app/_model/rol';
import { Usuarios } from 'src/app/_model/usuarios';
import { UsuariosMigraService } from 'src/app/_services/usuarios-migra.service';

@Component({
  selector: 'app-usuario-edicion',
  templateUrl: './usuario-edicion.component.html',
  styleUrls: ['./usuario-edicion.component.css']
})
export class UsuarioEdicionComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  edicion!: boolean;
  fecha: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuariosMigraService: UsuariosMigraService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'idUsuario': new FormControl(0),
      'enabled': new FormControl(''),
      'fechaCambio': new FormControl(''),
      'password': new FormControl(''),
      'email': new FormControl(''),
      'roles': new FormControl(''),
      'username': new FormControl(''),
      'failed': new FormControl(''),
      'fechaCreacion': new FormControl('')
    });

    this.route.params.subscribe((data:Params)=>{
      this.id =data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  get f() { return this.form.controls; }

  private initForm() {
    if (this.edicion) {

      this.usuariosMigraService.listarPorId(this.id).subscribe(data => {
        
        this.form = new FormGroup({
          'idUsuario': new FormControl(data.idUsuario),
          'enabled': new FormControl(data.enabled),
          'fechaCambio': new FormControl(data.fechaCambio),
          'email': new FormControl(data.email),
          'roles': new FormControl(data.roles[0].idRol), 
          'rolesNom': new FormControl(data.roles[0].nombre), 
          'username': new FormControl(data.username),
          'failed': new FormControl(data.failed),
          'password': new FormControl(data.password),
          'fechaActu': new FormControl(data.fechaActualizacion),
          'fechaCrea': new FormControl(data.fechaCreacion),
        });

      });
    }
  }


  operar() {

    if (this.form.invalid) { return; }

    let usuarios = new Usuarios();
    usuarios.idUsuario = this.form.value['idUsuario'];
    usuarios.enabled = this.form.value['enabled'];
    usuarios.fechaCambio = moment(this.fecha).add(3,'month').format('YYYY-MM-DDTHH:mm:ss');
    usuarios.password = this.form.value['password'];
    usuarios.email = this.form.value['email'];
    usuarios.roles = [
      {
        idRol: this.form.value['roles']
      }
    ];
    usuarios.username=  this.form.value['username'];
    usuarios.failed = this.form.value['failed'];
    usuarios.fechaCreacion = this.form.value['fechaCrea'];
    usuarios.fechaActualizacion = this.form.value['fechaActu'];

    if (this.edicion) {
      //PRACTICA IDEAL
      this.usuariosMigraService.modificar(usuarios).pipe(switchMap(() => {
        return this.usuariosMigraService.listar();
      })).subscribe(data => {
        this.usuariosMigraService.setUsuariosCambio(data);
        this.usuariosMigraService.setMensajecambio('SE MODIFICÓ');
      });
    } else {
       //PRACTICA COMUN
       usuarios.password = '$2a$10$ju20i95JTDkRa7Sua63JWOChSBc0MNFtG/6Sps2ahFFqN.HCCUMW.';
       usuarios.failed = 0 ;
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
