import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notiicacao.service';
import { TarefaService } from '../service/tarefa.service';
import { MatSelectModule } from '@angular/material/select';
import { PrioridadeEnum, TarefaInseridaViewModel } from '../models/tarefa.models';

@Component({
  selector: 'app-cadastrar-tarefas',
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
    MatSelectModule
  ],  templateUrl: './cadastrar-tarefas.component.html',
})
export class CadastrarTarefasComponent implements OnInit {
  public form: FormGroup;

  public prioridadeEnum = Object.values(PrioridadeEnum).filter((v) => !Number.isFinite(v))

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tarefaService: TarefaService,
    private notificacaoService: NotificacaoService
  )
  {
    this.form = this.fb.group({
      titulo:
      [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ]
      ],
      dataCriacao: [],
      dataConclusao: [],
      prioridade:
      [
        '',
        [
           Validators.required
        ]
      ],
      porcentagemConcluido: [],
      itens: []
    })
  }

  get titulo(){
    return this.form.get('titulo')
  }
  get dataCriacao(){
    return this.form.get('dataCriacao')
  }

  get dataConclusao(){
    return this.form.get('dataConclusao')
  }

  get prioridade(){
    return this.form.get('tipoPrioridade')
  }

  get porcentagemConcluido(){
    return this.form.get('porcentagemConcluido')
  }

  get itens(){
    return this.form.get('itens')
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulario corretamente!'
      );
      return;
    }

    const inserirTarefaVm = this.form.value;

    this.tarefaService.inserir(inserirTarefaVm).subscribe({
      next: (tarefaInserida) => this.processarSucesso(tarefaInserida),
      error: (erro) => this.processarFalha(erro)
    })
  }

  private processarSucesso(tarefa: TarefaInseridaViewModel): void {
    this.notificacaoService.sucesso(`Tarefa ${tarefa.titulo} cadastrado com sucesso`)

    this.router.navigate(['/tarefas', 'listar'])
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message)
  }
}
