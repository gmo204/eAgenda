import { Injectable } from "@angular/core"
import { environment } from "../../../../environments/environment.development"
import { HttpClient } from "@angular/common/http"
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { RegistrarUsuarioViewModel, TokenViewModel } from "../models/auth.models";

@Injectable()
export class AuthService {
    private apiUrl: string = environment.apiUrl

    constructor(private http: HttpClient) {}

    public registrar(registro: RegistrarUsuarioViewModel): Observable<TokenViewModel> {
      const resposta = this.http
      .post(this.apiUrl + '/contas/registrar', registro)
      .pipe(map(this.processarDados), catchError(this.processarFalha));

      return resposta;
    }

    private processarDados(resposta: any) : any {
      if (resposta.sucesso) return resposta.dados;

      throw new Error('Erro ao mapear token')
    }

    private processarFalha(resposta: any) {
      return throwError(() => new Error(resposta.error.erros[0]));
    }
}
