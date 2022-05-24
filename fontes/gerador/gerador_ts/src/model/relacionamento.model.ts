import { split } from "ts-node";

export class Relacionamento { 
  Tabela: string;
  Cardinalidade: string;
  Create: boolean; //[C]RUD
  Read: boolean;   //C[R]UD
  Update: boolean; //CR[U]D
  Delete: boolean; //CRU[D]

  /**
   * Local: cria um objeto da classe pai (mestre) na classe filha (detalhe) apenas
   * Inverse: cria um objeto (@OneToOne) ou uma lista (@OneToMany) na classe pai (mestre)
   * Both: cria um objeto na classe filha (Detalhe) e uma lista (@OneToMany) ou um Objeto (@OneToOne) na classe pai (Mestre)
   */
  Side: string;

  constructor(objeto: { tabela: string; opcoes: string; }) { 
    this.Tabela = objeto['tabela'];
    let arrayOpcoes = objeto['opcoes'].split('|');
    this.Cardinalidade = arrayOpcoes[0];

    let operacoes = arrayOpcoes[1];
    this.Create = operacoes.includes('C') ? true : false;
    this.Read = operacoes.includes('R') ? true : false;
    this.Update = operacoes.includes('U') ? true : false;
    this.Delete = operacoes.includes('D') ? true : false;

    this.Side = arrayOpcoes[2];
  }

}