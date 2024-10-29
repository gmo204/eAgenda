import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ListarTarefaViewModel } from '../models/tarefa.models';

@Component({
  selector: 'app-listar-tarefa',
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
  ],  templateUrl: './listar-tarefa.component.html',
})
export class ListarTarefaComponent {
  tarefas: ListarTarefaViewModel[] = [];

  
}
