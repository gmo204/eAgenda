import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notiicacao.service';
import { TarefaService } from '../service/tarefa.service';
import { MatSelectModule } from '@angular/material/select';
import { PrioridadeEnum, TarefaInseridaViewModel } from '../models/tarefa.models';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipModule } from '@angular/material/tooltip';

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
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    MatTooltipModule
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
      prioridade:
      [
        0,
        [
           Validators.required
        ]
      ],
      itens: this.fb.array([])
    })
  }

  get titulo(){
    return this.form.get('titulo')
  }
  get prioridade(){
    return this.form.get('prioridade')
  }
  get itens(){
    return this.form.get('itens') as FormArray;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public adicionarItem(tituloItem: string) {
    if(tituloItem.length  < 3) {
      this.notificacaoService.aviso(
      'O titulo deve ter no minimoo 3 caracteres.'
    );
      return
    }

    const control = new FormControl({
      titulo: tituloItem,
      status: 1,
      concluido: false,
    })

    this.itens.push(control)
  }

  public removerItem(indiceItem: number){
    this.itens.removeAt(indiceItem);

    this.notificacaoService.aviso('Item removido');
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
