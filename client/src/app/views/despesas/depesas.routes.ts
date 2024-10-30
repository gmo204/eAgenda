import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { ListarDespesasComponent } from "./listar/listar-despesas.component";
import { inject } from "@angular/core";
import { ListarDespesaViewModel, VisualizarDespesaViewModel } from "./models/despesa.models";
import { DespesaService } from "./services/despesa.service";
import { listagemCategoriasResolver } from "../categorias/categorias.routes";
import { CadastrarDespesasComponent } from "./cadastrar/cadastrar-despesas.component";
import { EditarDespesasComponent } from "./editar/editar-despesas.component";
import { ExcluirDespesasComponent } from "./excluir/excluir-despesas.component";

export const listagemDespesasResolver: ResolveFn<
  ListarDespesaViewModel[]
> = () => {
  return inject(DespesaService).selecionarTodos();
};


export const visualizarDespesaResolver: ResolveFn<VisualizarDespesaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.params['id'];

  return inject(DespesaService).selecionarPorId(id);
};

export const despesasRoutes: Routes = [
  {path: '', redirectTo: 'listar', pathMatch: 'full'},
  {
    path: 'listar',
    component: ListarDespesasComponent,
    resolve: { despesas : listagemDespesasResolver }
  },
  {
    path: 'cadastrar',
    component: CadastrarDespesasComponent,
    resolve: { categorias: listagemCategoriasResolver }
  },
  {
    path: 'editar/:id',
    component: EditarDespesasComponent,
    resolve: {
      despesa: visualizarDespesaResolver,
      categorias: listagemCategoriasResolver
    }
  },
  {
    path: 'excluir/:id',
    component: ExcluirDespesasComponent,
    resolve: {
      despesa: visualizarDespesaResolver,
      categorias: listagemCategoriasResolver
    }
  }
]
