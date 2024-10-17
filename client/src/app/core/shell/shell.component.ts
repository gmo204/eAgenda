import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LinkNavegacao } from './models/link-navegacao.model';
@Component({
selector: 'app-shell',
standalone: true,
imports: [
NgIf,
NgForOf,
AsyncPipe,
RouterOutlet,
RouterLink,
MatToolbarModule,
MatButtonModule,
MatSidenavModule,
MatListModule,
MatIconModule,
],
templateUrl: './shell.component.html',
styleUrl: './shell.component.scss',
})
export class ShellComponent {
links: LinkNavegacao[] = [
{
titulo: 'Login',
icone: 'login',
rota: '/login',
},
{
titulo: 'Registro',
icone: 'person_add',
rota: '/registro',
},
{
titulo: 'Dashboard',
icone: 'home',
rota: '/dashboard',
},
];
isHandset$: Observable<boolean>;
constructor(private breakpointObserver: BreakpointObserver) {
this.isHandset$ = this.breakpointObserver
.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Tablet])
.pipe(
map((result) => result.matches),
shareReplay()
);
}
}
