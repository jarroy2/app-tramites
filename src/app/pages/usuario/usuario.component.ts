import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading = false;

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.getAll();
  }


  private getAll(): void {
    this.loading = true;
    this.usuarioService.getAll().subscribe(resp => {

      this.usuarios = resp.data;

      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }

}
