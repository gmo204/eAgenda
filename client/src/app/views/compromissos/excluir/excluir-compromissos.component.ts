import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VisualizarCompromissoViewModel } from '../models/compromisso-models';
import { NotificacaoService } from '../../../core/notificacao/notiicacao.service';
import { CompromissoService } from '../service/compromisso.service';

@Component({
  selector: 'app-excluir-compromissos',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],  templateUrl: './excluir-compromissos.component.html',
})
export class ExcluirCompromissosComponent implements OnInit {
  detalhesCompromisso?: VisualizarCompromissoViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compromissoService: CompromissoService,
    private notificacaoService: NotificacaoService
  ) {}
  ngOnInit(): void {
    this.detalhesCompromisso = this.route.snapshot.data['compromisso'];
  }

  public excluir(){
    this.compromissoService.excluir(this.detalhesCompromisso!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro)
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso('Compromisso excluído com sucesso!');

    this.router.navigate(['/compromissos', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
