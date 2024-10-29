import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListarCompromissosViewModel } from '../models/compromisso-models';
import { NgForOf, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CompromissoService } from '../service/compromisso.service';

@Component({
  selector: 'app-listagem-contato',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './listagem-compromisso.component.html',
  providers: [CompromissoService]
})
export class ListagemCompromissoComponent implements OnInit {
  compromissos: ListarCompromissosViewModel[] = [];

  constructor (private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.compromissos = this.route.snapshot.data['compromissos'];
  }
}
