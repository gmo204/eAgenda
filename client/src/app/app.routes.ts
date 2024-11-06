import { CanMatchFn, Router, Routes, UrlTree } from '@angular/router';
import { UsuarioService } from './core/auth/services/usuario.service';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';

const authGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  return usuarioService.usuarioAutenticado
  .pipe(map(usuario => {
    if(!usuario)
      return router.parseUrl('/login')

    return true;
  }));
}

const authUserGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  return usuarioService.usuarioAutenticado
  .pipe(map(usuario => {
    if(usuario)
      return router.parseUrl('/dashboard')
    return true;
  }));
}

export const routes: Routes = [
  {path: '', redirectTo:  'dashboard', pathMatch: 'full'},
  {
    path: 'dashboard',
    loadComponent: () => import('./views/dashboard/dashboard.component').then(
      c => c.DashboardComponent),
    canMatch: [authGuard]
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./core/auth/views/registro/registro.component').then(
        c => c.RegistroComponent
      ),
    canMatch: [authUserGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/views/login/login.component').then(
        c => c.LoginComponent
      ),
    canMatch: [authUserGuard]
  },
  {
    path: 'contatos',
    loadChildren: () =>
      import('./views/contatos/contatos.routes').then(
        (m) => m.contatosRoutes
      ),
    canMatch: [authGuard]
  },
  {
    path: 'compromissos',
    loadChildren: () =>
      import('./views/compromissos/compromissos.routes').then(
        (m) => m.compromissosRoutes
      ),
    canMatch: [authGuard]
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./views/categorias/categorias.routes').then(
        (m) => m.categoriasRoutes
      ),
    canMatch: [authGuard]
  },
  {
    path: 'despesas',
    loadChildren: () =>
      import('./views/despesas/depesas.routes').then(
        (m) => m.despesasRoutes
      ),
    canMatch: [authGuard]
  },
  {
    path: 'tarefas',
    loadChildren: () =>
      import('./views/tarefas/tarefas.routes').then(
        (m) => m.tarefasRoutes
      ),
    canMatch: [authGuard]
  }
];
