import { inject } from "@angular/core";
import { ResolveFn, Routes } from "@angular/router";
import { ListagemCompromissoComponent } from "./listar/listagem-compromisso.component";
import { CompromissoService } from "./service/compromisso.service";
import { ListarCompromissosViewModel } from "./models/compromisso-models";

const listagemCompromissoResolver: ResolveFn<ListarCompromissosViewModel[]> = () => {
  return inject(CompromissoService).selecionarTodos();
}

export const compromissosRoutes: Routes = [
  {path: '', redirectTo: 'listar', pathMatch: 'full' },
  {path: 'listar',
    component: ListagemCompromissoComponent,
    resolve: {
      compromissos : listagemCompromissoResolver
    }
  }
]
