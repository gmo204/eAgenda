import { AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './registro.component.html',
})
export class RegistroComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  get nome() {
    return this.form.get('nome')
  }
  get login() {
    return this.form.get('login')
  }
  get email() {
    return this.form.get('email')
  }
  get senha() {
    return this.form.get('senha')
  }

  public registrar() {
    if (this.form.invalid)
      return;

    console.log("Registrado")
  }
}
