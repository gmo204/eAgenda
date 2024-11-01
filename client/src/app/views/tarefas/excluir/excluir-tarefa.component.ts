import { Component, OnInit } from '@angular/core';
import { PrioridadeEnum, VisualizarTarefaViewModel } from '../models/tarefa.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TarefaService } from '../service/tarefa.service';
import { NotificacaoService } from '../../../core/notificacao/notiicacao.service';
import { NgIf, NgForOf, AsyncPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-excluir-tarefa',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    DatePipe,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './excluir-tarefa.component.html',

})
export class ExcluirTarefaComponent implements OnInit{
  detalhesTarefa?: VisualizarTarefaViewModel;

 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private tarefaService: TarefaService,
  private notificacaoService: NotificacaoService
 ) {}

  ngOnInit(): void {
    this.detalhesTarefa = this.route.snapshot.data['tarefa']
  }

  public obterTextoPrioridade(prioridade: PrioridadeEnum): string {
    return PrioridadeEnum[Number(prioridade)];
  }

  public excluir() {
    this.tarefaService.excluir(this.detalhesTarefa!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso('Tarefa excluída com sucesso!');

    this.router.navigate(['/tarefas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
