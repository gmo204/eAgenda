import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { ListarTarefaComponent } from "./listar/listar-tarefa.component";
import { CadastrarTarefasComponent } from "./cadastrar/cadastrar-tarefas.component";
import { TarefaService } from "./service/tarefa.service";
import { ListarTarefaViewModel, VisualizarTarefaViewModel } from "./models/tarefa.models";
import { inject } from "@angular/core";
import { EditarTarefaComponent } from "./editar/editar-tarefa.component";
import { ExcluirTarefaComponent } from "./excluir/excluir-tarefa.component";

const listagemTarefaResolver: ResolveFn<ListarTarefaViewModel[]> = () => {
  return inject(TarefaService).selecionarTodos();
}

const visualizarTarefaResolver: ResolveFn<VisualizarTarefaViewModel> = (
  route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  return inject(TarefaService).selecionarPorId(id);
};

export const tarefasRoutes: Routes = [
  {path: '', redirectTo: 'listar', pathMatch: 'full'},
  {
    path:'listar',
    component: ListarTarefaComponent,
    resolve: { tarefas: listagemTarefaResolver }
  },
  {
    path: 'cadastrar',
    component: CadastrarTarefasComponent,
  },
  {
    path: 'editar/:id',
    component: EditarTarefaComponent,
    resolve: { tarefa: visualizarTarefaResolver }
  },
  {
    path: 'excluir/:id',
    component: ExcluirTarefaComponent,
    resolve: { tarefa: visualizarTarefaResolver }
  }
]
