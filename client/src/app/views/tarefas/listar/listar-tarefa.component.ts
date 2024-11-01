import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  ],
  templateUrl: './listar-tarefa.component.html',
})
export class ListarTarefaComponent implements OnInit{
  public tarefas: ListarTarefaViewModel[] = [];

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.tarefas = this.route.snapshot.data['tarefas']
  }

  public formatarData(data: string): string {
    const novaData = new Date(data)
    return novaData.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
