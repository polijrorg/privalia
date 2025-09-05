export class Campanha {
  readonly nome: string;
  readonly modeloNegocio: string;
  readonly processoAuditado: string;
  readonly pedido: string;
  readonly po: string;
  readonly idZepre: string;
  readonly totalPecas: string;
  readonly amostragem: number;
  aprovados: number;
  divergencias: number;
  itensAuditados: number;

  constructor(
    nome: string,
    modeloNegocio: string,
    processoAuditado: string,
    pedido: string,
    po: string,
    idZepre: string,
    totalPecas: string,
    amostragem: number
  ) {
    this.nome = nome;
    this.modeloNegocio = modeloNegocio;
    this.processoAuditado = processoAuditado;
    this.pedido = pedido;
    this.po = po;
    this.idZepre = idZepre;
    this.totalPecas = totalPecas;
    this.amostragem = amostragem;

    // Valores default para os editáveis
    this.aprovados = 0;
    this.divergencias = 0;
    this.itensAuditados = 0;
  }
}
