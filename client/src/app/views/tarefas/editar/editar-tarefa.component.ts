import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  EditarTarefaViewModel,
  ItemTarefaViewModel,
  PrioridadeEnum,
  TarefaEditadaViewModel
} from '../models/tarefa.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TarefaService } from '../service/tarefa.service';
import { NotificacaoService } from '../../../core/notificacao/notiicacao.service';
import { NgIf, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-editar-tarefa',
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
  ],
  templateUrl: './editar-tarefa.component.html',
})
export class EditarTarefaComponent implements OnInit{
  public form: FormGroup;
  public prioridadeEnum = Object.values(PrioridadeEnum).filter(
    (v) => !Number.isFinite(v)
  );

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
      prioridade: [0, [Validators.required]],
      itens: this.fb.array([])
    });
  }

  get titulo() {
    return this.form.get('titulo');
  }

  get prioridade() {
    return this.form.get('prioridade');
  }

  get itens() {
    return this.form.get('itens') as FormArray;
  }

  get itensParaExibicao() {
    return this.itens.controls.filter((c) => c.value.status !== 2)
  }


  ngOnInit(): void {
    const tarefa = this.route.snapshot.data['tarefa'];

    this.form.patchValue(tarefa);

    for (let item of tarefa.itens){
      const controle = new FormControl({
        id: item.id,
        titulo: item.titulo,
        status: item.status,
        concluido: item.concluido
      });

      this.itens.push(controle);
    }
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

  public alterarStatusItem(indiceItem: number){
    const itemSelecionado: ItemTarefaViewModel = this.itens.at(indiceItem).value;

    const objetoEditado = {
      ...itemSelecionado,
      concluido: !(itemSelecionado.concluido)
    }

    this.itens.at(indiceItem).patchValue(objetoEditado)

    if (itemSelecionado.concluido) {
      this.notificacaoService.aviso(
        'Conclusão do item marcada para ser cancelada.'
      );

      return;
    }

    this.notificacaoService.aviso('Item marcado para conclusão.');

  }

  public removerItem(indiceItem: number){
    const itemSelecionado: ItemTarefaViewModel =this.itens.at(indiceItem).value;

    const objetoEditado = {
      ...itemSelecionado,
      status: 2,
    };

    this.itens.at(indiceItem).patchValue(objetoEditado)

    this.notificacaoService.aviso('Item removido');
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulário corretamente.'
      );

      return;
    }

    const id = this.route.snapshot.params['id'];
    const editarTarefa: EditarTarefaViewModel = this.form.value;

    this.tarefaService.editar(editarTarefa, id).subscribe({
      next: (tarefaInserida) => this.processarSucesso(tarefaInserida),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(registro: TarefaEditadaViewModel): void {
    this.notificacaoService.sucesso(
      `Tarefa "${registro.titulo}" editada com sucesso!`
    );

    this.router.navigate(['/tarefas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
