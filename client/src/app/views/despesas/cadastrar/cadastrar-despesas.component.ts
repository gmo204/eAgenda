import { NgIf, NgForOf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notiicacao.service';
import { DespesaService } from '../services/despesa.service';
import { InserirDespesaViewModel, DespesaInseridaViewModel, FormaPgtoDespesaEnum } from '../models/despesa.models';
import { ListarCategoriaViewModel } from '../../categorias/models/categoria.models';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cadastrar-despesas',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule
  ],  templateUrl: './cadastrar-despesas.component.html',
})
export class CadastrarDespesasComponent implements OnInit {
  form: FormGroup;
  categorias: ListarCategoriaViewModel[] = [];

  public opcoesPagamento = Object.values(FormaPgtoDespesaEnum).filter(
    (v) => !Number.isFinite(v)
  );

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private despesaService: DespesaService,
    private notificacaoService: NotificacaoService
  )
  {
    this.form = this.fb.group({
      descricao: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      valor: [0.0, [Validators.required, Validators.min(1)]],
      data: [new Date().toISOString().substring(0, 10), [Validators.required]],
      formaPagamento: [0, [Validators.required]],
      categoriasSelecionadas: [[], [Validators.required]],
    })
  }

  get descricao() {
    return this.form.get('descricao');
  }

  get valor() {
    return this.form.get('valor');
  }

  get data() {
    return this.form.get('data');
  }

  get formaPagamento() {
    return this.form.get('formaPagamento');
  }

  get categoriasSelecionadas() {
    return this.form.get('categoriasSelecionadas') as FormArray;
  }

  ngOnInit(): void {
    this.categorias = this.route.snapshot.data['categorias'];
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulário corretamente.'
      );

      return;
    }

    const inserirDespesa: InserirDespesaViewModel = this.form.value;

    this.despesaService.inserir(inserirDespesa).subscribe({
      next: (despesaInserida) => this.processarSucesso(despesaInserida),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(registro: DespesaInseridaViewModel): void {
    this.notificacaoService.sucesso(
      `Despesa "${registro.descricao}" cadastrada com sucesso!`
    );

    this.router.navigate(['/despesas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
