import * as lodash from 'lodash';

export class DelphiController {
  table: string; // armazena o nome da tabela
  class: string; // armazena o nome da classe
  path: string; // armazena o nome do caminho para API REST

  constructor(tabela: string) {
    // nome da classe
    this.class = lodash.camelCase(tabela);
    this.class = lodash.upperFirst(this.class);

    // nome da tabela
    this.table = tabela.toUpperCase();

    // path
    this.path = lodash.replace(tabela.toLowerCase(), '_', '-');
  }
}