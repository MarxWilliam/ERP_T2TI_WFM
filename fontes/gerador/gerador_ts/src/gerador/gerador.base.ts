import * as fs from 'fs';

export class GeradorBase { 
  
  constructor() { }

  async criaDiretorio(caminho: string) { 
    try {
      if (!fs.existsSync(caminho)) { 
        return fs.mkdirSync(caminho); // esse return foi eu que coloquei William
      }
      return true;
    } catch(erro) {
      return erro;
     }
  }
  // fs.mkdir('I:/Doc/node/fontes/' + linguagem + '/' + tabela, { recursive: true }, (err) => {
  //   if (err) throw err;
  // });

  /** 
   * Salvar arquivo no disco
   */
  async gravarArquivo(caminho: string, conteudo: any) { 
    fs.writeFile(caminho, conteudo, function (erro: any) {
      if (erro) {
        return erro;
      } else {
        return true;
      }
    });  
  }
}
