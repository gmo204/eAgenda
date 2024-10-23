import { Injectable } from "@angular/core"
import { environment } from "../../../../environments/environment.development"
import { HttpClient } from "@angular/common/http"
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AutenticarUsuarioViewModel, RegistrarUsuarioViewModel, TokenViewModel } from "../models/auth.models";

@Injectable()
export class AuthService {
    private apiUrl: string = environment.apiUrl

    constructor(private http: HttpClient) {}

    public registrar(
      registro: RegistrarUsuarioViewModel
    ): Observable<TokenViewModel> {
      const urlCompleto = `${this.apiUrl}/contas/registrar`;

      return this.http
        .post<TokenViewModel>(urlCompleto, registro)
        .pipe(map(this.processarDados));
    }

    public login(loginUsuario: AutenticarUsuarioViewModel) {
      const urlCompleto = `${this.apiUrl}/contas/autenticar`;

      return this.http
        .post<TokenViewModel>(urlCompleto, loginUsuario).pipe(
        map(this.processarDados),
        catchError(this.processarErro)
      );
    }

    public logout() {
      const urlCompleto = `${this.apiUrl}/contas/sair`;

      return this.http.post(urlCompleto, {});
    }

    public validarExpiracaoToken(dataExpiracaoToken: Date): boolean {
      return dataExpiracaoToken > new Date();
    }

    private processarDados(resposta: any): TokenViewModel {
      if (resposta.sucesso) return resposta.dados;

      throw new Error('Erro ao mapear token do usuário.');
    }

    private processarErro(erro: any){
      return throwError(() => new Error(erro.error.erros[0]));
    }

}
