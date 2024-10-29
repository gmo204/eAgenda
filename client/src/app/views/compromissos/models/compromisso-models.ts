import { ListarContatoViewModel } from '../../contatos/models/contato.models';


export enum TipoEnderecoEnum {
  Remoto,
  Presencial
}

export interface InserirCompromissoViewModel {
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino : string;
  tipoEndereco: TipoEnderecoEnum,
  endereco?: string;
  link?: string;
  contatoId?: string;
}
export interface CompromissoInseridoViewModel {
  id: string;
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino : string;
  tipoEndereco: boolean,
  endereco: string;
  contatoId?: string;
}

export interface EditarCompromissoViewModel {
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino : string;
  tipoEndereco: boolean,
  endereco: string;
  contatoId?: string;
}

export interface CompromissoEditadoViewModel {
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino : string;
  tipoEndereco: boolean,
  endereco: string;
  contatoId?: string;
}

export interface CompromissoExcluidoViewModel {}

export interface VisualizarCompromissoViewModel {
  id: string;
  assunto: string;
  tipoLocal: TipoEnderecoEnum;
  local?: string;
  link?: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contato: ListarContatoViewModel;
}

export interface ListarCompromissosViewModel {
  id: string;
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino : string;
}

