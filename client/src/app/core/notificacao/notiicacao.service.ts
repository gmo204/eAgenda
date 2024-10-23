import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable ({providedIn: 'root'})
export class NotificacaoService {
  constructor(private snackbar: MatSnackBar) {}

  sucesso(mensagem: string): void {
    this.snackbar.open(mensagem, 'Ok', {
      panelClass: ['notificacao-sucesso']
    })
  }

  aviso(mensagem: string): void {
    this.snackbar.open(mensagem, 'Ok', {
      panelClass: ['notificacao-aviso']
    })
  }

  erro(mensagem: string): void {
    this.snackbar.open(mensagem, 'Ok', {
      panelClass: ['notificacao-erro']
    })
  }
}
