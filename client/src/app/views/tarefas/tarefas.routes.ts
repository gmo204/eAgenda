import { Routes } from "@angular/router";
import { ListarTarefaComponent } from "./listar/listar-tarefa.component";
import { CadastrarTarefasComponent } from "./cadastrar/cadastrar-tarefas.component";

export const tarefasRoutes: Routes = [
  {path: '', redirectTo: 'listar', pathMatch: 'full'},
  {path:'listar', component: ListarTarefaComponent},
  {path: 'cadastrar', component: CadastrarTarefasComponent}
]
