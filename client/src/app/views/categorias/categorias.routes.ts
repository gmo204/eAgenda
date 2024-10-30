import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { CategoriaService } from './services/categorias.service';
import { ListagemCategoriasComponent } from './listar/listar-categoria.component';
import { CadastroCategoriaComponent } from './cadastrar/cadastrar-categoria.component';
import { EdicaoCategoriaComponent } from './editar/editar-categoria.component';
import { ExclusaoCategoriaComponent } from './excluir/excluir-categoria.component';
import { ListarCategoriaViewModel, VisualizarCategoriaViewModel } from './models/categoria.models';


const visualizarCategoriaResolver: ResolveFn<VisualizarCategoriaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.params['id'];

  return inject(CategoriaService).selecionarPorId(id);
};

export const listagemCategoriasResolver: ResolveFn<
  ListarCategoriaViewModel[]> = () => {
  return inject(CategoriaService).selecionarTodos();
};

export const categoriasRoutes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListagemCategoriasComponent,
    resolve: { categorias: listagemCategoriasResolver },
  },
  {
    path: 'cadastrar',
    component: CadastroCategoriaComponent,
  },
  {
    path: 'editar/:id',
    component: EdicaoCategoriaComponent,
    resolve: { categoria: visualizarCategoriaResolver },
  },
  {
    path: 'excluir/:id',
    component: ExclusaoCategoriaComponent,
    resolve: { categoria: visualizarCategoriaResolver },
  },
];
