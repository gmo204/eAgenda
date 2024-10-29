import { NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notiicacao.service';
import { ContatoService } from '../../contatos/services/contato.service';

@Component({
  selector: 'app-cadastrar',
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
  ],  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss'
})
export class CadastrarComponent {
  public form: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contatoService: ContatoService,
    private notificacaoService: NotificacaoService ) {

      this.form = this.fb.group({
        assunto: [],
        local: [],
        tipoLocal: [],
        link: [],
        data: [],
        horaInicio: [],
        horaTermino: [],
      })
    }
}
