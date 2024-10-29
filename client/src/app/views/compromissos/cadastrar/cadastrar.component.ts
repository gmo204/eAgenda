import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notiicacao.service';
import { CompromissoInseridoViewModel, TipoEnderecoEnum } from '../models/compromisso-models';
import { CompromissoService } from '../service/compromisso.service';
import { MatSelectModule } from '@angular/material/select';
import { ListarContatoViewModel } from '../../contatos/models/contato.models';

@Component({
  selector: 'app-cadastrar',
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
  ],
  templateUrl: './cadastrar.component.html',
})
export class CadastrarCompromissoComponent implements OnInit{
  public form: FormGroup

  public opcoesLocal = Object.values(TipoEnderecoEnum).filter((v) => !Number.isFinite(v))

  public contatos: ListarContatoViewModel[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private compromissoService: CompromissoService,
    private notificacaoService: NotificacaoService,
    private route: ActivatedRoute ) {

    this.form = this.fb.group({
      assunto: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ]
      ],
      tipoLocal: ['0', [Validators.required]],
      local: [],
      link: [],
      data: [new Date().toISOString().substring(0,10), [Validators.required]],
      horaInicio: ['08:00', [Validators.required]],
      horaTermino: ['09:00', [Validators.required]],
      contatoId: ['']
    })
  }
  ngOnInit(): void {
    this.contatos = this.route.snapshot.data['contatos']
  }

  get assunto() {
    return this.form.get('assunto')
  }

  get tipoLocal() {
    return this.form.get('tipoLocal')
  }

  get local() {
    return this.form.get('local')

  }
  get link() {
    return this.form.get('link')
  }

  get data() {
    return this.form.get('data')
  }

  get horaInicio() {
    return this.form.get('horaInicio')
  }

  get horaTermino() {
    return this.form.get('horaTermino')
  }


  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulario corretamente!'
      );

      return;
    }

    const inserirCompromissoVm = this.form.value;

    this.compromissoService.inserir(inserirCompromissoVm).subscribe({
      next: (compromissoInserido) => this.processarSucesso(compromissoInserido),
      error: (erro) => this.processarFalha(erro)
    });

    this.compromissoService.inserir(inserirCompromissoVm).subscribe();
    }

    private processarSucesso(compromisso: CompromissoInseridoViewModel): void {
      this.notificacaoService.sucesso(`Compromisso ${compromisso.assunto} cadastrado com sucesso`)

      this.router.navigate(['/compromissos', 'listar'])
    }

    private processarFalha(erro: Error): any {
      this.notificacaoService.erro(erro.message)
    }
}
