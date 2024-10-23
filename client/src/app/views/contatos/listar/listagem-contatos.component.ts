import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ListarContatoViewModel } from '../models/contato.models';
import { ContatoService } from '../services/contato.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-listagem-contatos',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  providers: [ContatoService],
  templateUrl: './listagem-contatos.component.html',
})
export class ListagemContatosComponent implements OnInit{
  contatos$: Observable<ListarContatoViewModel[]>;

  constructor(private contatoService: ContatoService) {
    this.contatos$ = of ([])
  }
  ngOnInit(): void {
    this.contatos$ = this.contatoService.selecionarTodos()
  }
}