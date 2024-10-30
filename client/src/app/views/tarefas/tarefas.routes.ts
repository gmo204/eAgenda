import { ResolveFn, Routes } from "@angular/router";
import { ListarTarefaComponent } from "./listar/listar-tarefa.component";
import { CadastrarTarefasComponent } from "./cadastrar/cadastrar-tarefas.component";
import { TarefaService } from "./service/tarefa.service";
import { ListarTarefaViewModel } from "./models/tarefa.models";
import { inject } from "@angular/core";

const listagemTarefaResolver: ResolveFn<ListarTarefaViewModel[]> = () => {
  return inject(TarefaService).selecionarTodos();
}

export const tarefasRoutes: Routes = [
  {path: '', redirectTo: 'listar', pathMatch: 'full'},
  {
    path:'listar',
    component: ListarTarefaComponent,
    resolve: listagemTarefaResolver
  },
  {
    path: 'cadastrar', component: CadastrarTarefasComponent
  }
]
