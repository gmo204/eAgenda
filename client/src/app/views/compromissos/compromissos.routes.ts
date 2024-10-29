import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { ListagemCompromissoComponent } from "./listar/listagem-compromisso.component";
import { CompromissoService } from "./service/compromisso.service";
import { ListarCompromissosViewModel, VisualizarCompromissoViewModel } from "./models/compromisso-models";
import { CadastrarCompromissoComponent } from "./cadastrar/cadastrar.component";
import { listagemContatosResolver } from "../contatos/contatos.routes";
import { EditarCompromissosComponent } from "./editar/editar-compromissos.component";

const listagemCompromissoResolver: ResolveFn<ListarCompromissosViewModel[]> = () => {
  return inject(CompromissoService).selecionarTodos();
}

function visualizarCompromissoResolver(route: ActivatedRouteSnapshot) {
  const id = route.params['id'];

  return inject(CompromissoService).selecionarPorId(id);
}


export const compromissosRoutes: Routes = [
  {path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemCompromissoComponent,
    resolve: {
      compromissos : listagemCompromissoResolver
    }
  },

  {
    path: 'cadastrar',
    component: CadastrarCompromissoComponent,
    resolve: { contatos: listagemContatosResolver }
  },
  {
    path: 'editar/:id',
    component: EditarCompromissosComponent,
    resolve: {
      compromisso: visualizarCompromissoResolver,
      contatos: listagemContatosResolver
    }
  }

]
