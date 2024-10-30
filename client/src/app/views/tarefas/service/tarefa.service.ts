import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import {
  EditarTarefaViewModel,
  InserirTarefaViewModel,
  ListarTarefaViewModel,
  TarefaEditadaViewModel,
  TarefaInseridaViewModel,
  VisualizarTarefaViewModel
} from '../models/tarefa.models';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private readonly url = `${environment.apiUrl}/tarefas`

  constructor( private http: HttpClient) { }

  public inserir(inserirTarefaVm: InserirTarefaViewModel): Observable<TarefaInseridaViewModel> {
    return this.http
    .post<TarefaInseridaViewModel>(this.url, inserirTarefaVm)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    editarTarefaVm: EditarTarefaViewModel,
    id: string,
  ): Observable<TarefaEditadaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
    .put<TarefaEditadaViewModel>(urlCompleto, editarTarefaVm)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<TarefaEditadaViewModel> {
    const urlCompleto = `${this.url}/${id}`

    return this.http
    .delete<VisualizarTarefaViewModel>(urlCompleto)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(): Observable<ListarTarefaViewModel[]> {
    return this.http
    .get<ListarTarefaViewModel[]>(this.url)
    .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  public selecionarPorId(id: string): Observable<VisualizarTarefaViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`

    return this.http
    .get<VisualizarTarefaViewModel>(urlCompleto)
    .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;

    throw new Error('Erro ao mapear dados')
  }

  private processarFalha(erro: any) {
    return throwError(() => new Error(erro.error.erros[0]));
  }
}
