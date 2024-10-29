import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CompromissoEditadoViewModel, CompromissoInseridoViewModel, EditarCompromissoViewModel, InserirCompromissoViewModel, ListarCompromissosViewModel, VisualizarCompromissoViewModel } from '../models/compromisso-models';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {
  private readonly url = `${environment.apiUrl}/compromissos`

  constructor(
    private http: HttpClient
  ) {}

  public inserir(
    inserirCompromissoVm: InserirCompromissoViewModel
  ): Observable<CompromissoInseridoViewModel> {
    return this.http
    .post<CompromissoInseridoViewModel>(this.url, inserirCompromissoVm)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    id: string,
    registro : EditarCompromissoViewModel
  ): Observable<CompromissoEditadoViewModel> {
    const urlCompleto = `${this.url}/${id}`

    return this.http
    .put<CompromissoEditadoViewModel>(urlCompleto, registro)
    .pipe(map(this.processarDados), catchError(this.processarFalha))
  }


  public selecionarTodos(): Observable<ListarCompromissosViewModel[]>  {
    return this.http
    .get<ListarCompromissosViewModel[]>(this.url)
    .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  public selecionarPorId(id: string): Observable<VisualizarCompromissoViewModel[]>  {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`

    return this.http
    .get<ListarCompromissosViewModel[]>(urlCompleto)
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
