export enum PrioridadeEnum{
  Baixa,
  Media,
  Alta
}

export interface ItemTarefaViewModel {
  id: string;
  titulo: string;
  status: number;
  concluido: boolean;
}

export interface InserirTarefaViewModel{
  titulo: string;
  prioridade: PrioridadeEnum;
  itens: ItemTarefaViewModel[];
}

export interface TarefaInseridaViewModel{
  id: string;
  titulo: string;
  prioridade: PrioridadeEnum;
  itens: ItemTarefaViewModel[];
}

export interface EditarTarefaViewModel{
  id: string;
  titulo: string;
  prioridade: PrioridadeEnum;
  itens: ItemTarefaViewModel[];
}

export interface TarefaEditadaViewModel{
  id: string;
  titulo: string;
  prioridade: PrioridadeEnum;
  itens: ItemTarefaViewModel[];
}

export interface TarefaExcluidaViewModel {}

export interface ListarTarefaViewModel{
  id: string;
  titulo: string;
  dataCriacao: string;
  prioridade: PrioridadeEnum;
  situacao: string;
}

export interface VisualizarTarefaViewModel{
  id: string;
  titulo: string;
  prioridade: PrioridadeEnum;
  situacao: string;

  dataCriacao: string;
  dataConclusao?: string;
  percentualConcluido: number;

  quantidadedeItens: number;
  itens: ItemTarefaViewModel[]
}
