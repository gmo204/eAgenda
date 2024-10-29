import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import
{
  ContatoEditadoViewModel,
  ContatoInseridoViewModel,
  EditarContatoViewModel,
  InserirContatoViewModel,
  ListarContatoViewModel,
  VisualizarContatoViewModel
}
 from '../models/contato.models';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private readonly url = `${environment.apiUrl}/contatos`

  constructor(
    private http: HttpClient,
    ) { }

  public inserir(
    inserirContatoVm: InserirContatoViewModel
  ): Observable<ContatoInseridoViewModel> {
    return this.http
    .post<ContatoInseridoViewModel>(this.url, inserirContatoVm)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    id: string,
    editarContatoVm: EditarContatoViewModel
  ): Observable<ContatoEditadoViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
    .put<ContatoEditadoViewModel>(urlCompleto, editarContatoVm)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<ContatoEditadoViewModel> {
    const urlCompleto = `${this.url}/${id}`

    return this.http
    .delete<VisualizarContatoViewModel>(urlCompleto)
    .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  public selecionarTodos(): Observable<ListarContatoViewModel[]> {
    return this.http
    .get<ListarContatoViewModel[]>(this.url)
    .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  public selecionarPorId(id: string): Observable<VisualizarContatoViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`

    return this.http
    .get<VisualizarContatoViewModel>(urlCompleto)
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
