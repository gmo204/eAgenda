export enum PrioridadeEnum{
  Alta,
  Media,
  Baixa
}

export interface ItemTarefa{
  titulo: string;
  status: boolean;
  tarefa: string;
}

export interface ListarTarefaViewModel{
  id: string;
  titulo: string;
  prioridade: PrioridadeEnum;
  dataCriacao: Date;
  dataConclusao: Date;
  PercentualConcluido: string;
}

export interface VisualizarTarefaViewModel{
  titulo: string;
  prioridade: PrioridadeEnum;
  dataCriacao: Date;
  dataConclusao: Date;
  itens: ItemTarefa[];
  PercentualConcluido: string;
}

export interface InserirTarefaViewModel{
  titulo: string;
  prioridade: PrioridadeEnum;
  dataCriacao: Date;
  dataConclusao: Date;
  itens: ItemTarefa[];
  PercentualConcluido: string;
}

export interface TarefaInseridaViewModel{
  titulo: string;
  prioridade: PrioridadeEnum;
  dataCriacao: Date;
  dataConclusao: Date;
  itens: ItemTarefa[];
  PercentualConcluido: string;
}

export interface EditarTarefaViewModel{
  titulo: string;
  prioridade: PrioridadeEnum;
  dataCriacao: Date;
  dataConclusao: Date;
  itens: ItemTarefa[];
  PercentualConcluido: string;
}

export interface TarefaEditadaViewModel{
  titulo: string;
  prioridade: PrioridadeEnum;
  dataCriacao: Date;
  dataConclusao: Date;
  itens: ItemTarefa[];
  PercentualConcluido: string;
}

