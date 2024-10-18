import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShellComponent } from "./core/shell/shell.component";
import { AsyncPipe } from '@angular/common';
import { UsuarioTokenViewModel } from './core/auth/models/auth.models';
import { Observable } from 'rxjs';
import { UsuarioService } from './core/auth/services/usuario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShellComponent, AsyncPipe],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  usuarioAutenticado$?: Observable<UsuarioTokenViewModel | undefined>;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
      this.usuarioAutenticado$ = this.usuarioService.usuarioAutenticado;
  }

  efetuarLogout() {
    this.usuarioService.logout();
  }
}
