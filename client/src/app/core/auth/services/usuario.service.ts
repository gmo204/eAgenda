import { Injectable } from "@angular/core";
import { UsuarioTokenViewModel } from "../models/auth.models";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UsuarioService {

  private UsuarioAutenticadoSubject: BehaviorSubject<UsuarioTokenViewModel | undefined>;

  constructor() {
    this.UsuarioAutenticadoSubject = new BehaviorSubject<UsuarioTokenViewModel | undefined>(undefined);
  }

  get usuarioAutenticado() {
    return this.UsuarioAutenticadoSubject.asObservable();
  }

  public logarUsuario(usuario: UsuarioTokenViewModel): void {
    this.UsuarioAutenticadoSubject.next(usuario)
  }

  public logout(): void {
    this.UsuarioAutenticadoSubject.next(undefined)
  }
}
