export interface InserirCompromissoViewModel {
  assunto: string;
  data: Date;
  hora_início: string;
  hora_término : string;
  tipoEndereco: boolean,
  endereco: string;
  contatoId?: string;
}
export interface CompromissoInseridoViewModel {
  id: string;
  assunto: string;
  data: Date;
  hora_início: string;
  hora_término : string;
  tipoEndereco: boolean,
  endereco: string;
  contatoId?: string;
}

export interface EditarCompromissoViewModel {
  assunto: string;
  data: Date;
  hora_início: string;
  hora_término : string;
  tipoEndereco: boolean,
  endereco: string;
  contatoId?: string;
}

export interface CompromissoEditadoViewModel {
  assunto: string;
  data: Date;
  hora_início: string;
  hora_término : string;
  tipoEndereco: boolean,
  endereco: string;
  contatoId?: string;
}

export interface CompromissoExcluidoViewModel {}

export interface VisualizarCompromissoViewModel {
  id: string;
  assunto: string;
  data: Date;
  hora_início: string;
  hora_término : string;
  tipoEndereco: boolean,
  endereco: string;
  contatoId?: string;
}

export interface ListarCompromissosViewModel {
  id: string;
  assunto: string;
  data: Date;
  hora_início: string;
  hora_término : string;
  tipoEndereco: boolean,
  endereco: string;
  contatoId?: string;
}

