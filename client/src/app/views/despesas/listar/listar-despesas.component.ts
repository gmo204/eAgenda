import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListarDespesaViewModel } from '../models/despesa.models';

@Component({
  selector: 'app-listar-despesas',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterLink,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './listar-despesas.component.html',
})
export class ListarDespesasComponent implements OnInit{
  despesas: ListarDespesaViewModel[] = [];

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.despesas = this.route.snapshot.data['despesas'];
  }

}
