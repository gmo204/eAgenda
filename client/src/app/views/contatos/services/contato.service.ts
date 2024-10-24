import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../core/auth/services/local-storage.service';
import { ContatoInseridoViewModel, InserirContatoViewModel, ListarContatoViewModel } from '../models/contato.models';
import { catchError, delay, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  public inserir(inserirContatoVm: InserirContatoViewModel): Observable<ContatoInseridoViewModel> {
    return this.http.post<ContatoInseridoViewModel>(this.url, inserirContatoVm)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private readonly url = `${environment.apiUrl}/contatos`
  constructor(private http: HttpClient,
     private localStorage: LocalStorageService) { }

     public selecionarTodos(): Observable<ListarContatoViewModel[]> {
        return this.http
        .get<ListarContatoViewModel[]>(this.url)
        .pipe(map(this.processarDados), catchError(this.processarFalha), delay(2000))
     }

     private processarDados(resposta: any) {
      if (resposta.sucesso) return resposta.dados;

      throw new Error('Erro ao mapear dados')
     }

     private processarFalha(erro: any) {
      return throwError(() => new Error(erro.error.erroos[0]));
     }
}
