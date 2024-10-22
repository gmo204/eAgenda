import { NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import {
FormBuilder,
FormGroup,
ReactiveFormsModule,
Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Route, Router, RouterLink } from '@angular/router';
import {
AutenticarUsuarioViewModel,
TokenViewModel,
} from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { LocalStorageService } from '../../services/local-storage.service';
@Component({
selector: 'app-login',
standalone: true,
imports: [
NgIf,
NgForOf,
RouterLink,
ReactiveFormsModule,
MatFormFieldModule,
MatInputModule,
MatIconModule,
MatButtonModule,
],
templateUrl: './login.component.html',
})
export class LoginComponent {
  form : FormGroup;

  constructor(
    private fb : FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService
  ) {
    this.form = this.fb.group({
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  get login() {
    return this.form.get('login');
  }

  get senha() {
    return this.form.get('senha');
  }

  public entrar() {
    if (this.form.invalid) {
      return;
  }

  const loginUsuario: AutenticarUsuarioViewModel = this.form.value;

    this.authService.login(loginUsuario).subscribe((res) => {
      this.usuarioService.logarUsuario(res.usuario);
      this.localStorageService.salvarTokenAutenticacao(res);

      this.router.navigate(['/dashboard']);
    });
  }
}
