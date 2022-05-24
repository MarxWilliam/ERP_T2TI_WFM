import { Request, Response } from 'express';
import { TabelaService } from '../service/tabela.service';
//import { DelphiModel } from '../model/delphi.model');
import { RetornoJsonErro } from '../model/retorno.json.erro';
import { JavaModel } from '../gerador/java/java.model';
import * as Mustache from 'mustache';
import * as fs from 'fs';
import * as capitalize from 'capitalize';
import { NodeModel } from '../gerador/node/node.model';
import { GeradorDelphi } from '../gerador/delphi/gerador.delphi';
import { GeradorJava } from '../gerador/java/gerador.java';

export class TabelaController {
  constructor() { }


  public gerarFontes(req: Request, res: Response) {
    let linguagens = ["c", "delphi", "java", "node", "php"];
    let linguagem = req.params.linguagem;
    let tabela = req.params.nomeTabela;

    // verifica se a linguagem enviada pelo usuario esta na lista de linguagens esperada
    if (linguagens.includes(linguagem)) {
      switch (linguagem) {
        case 'c':
          break;
        case 'delphi':
          let geradorDelphi = new GeradorDelphi();
          geradorDelphi.gerarArquivos(tabela, (retorno: any, erro: any) => {
            if (erro != null) {
              let jsonErro = new RetornoJsonErro({ codigo: 500, mensagem: "Erro no Servidor [Gerar Arquivos Delphi]", erro: erro });
              res.status(500).send(jsonErro);
            } else {
              res.send(retorno);
            }
          });
          break;
        case 'java':
          let geradorJava = new GeradorJava();
          geradorJava.gerarArquivos(tabela, (retorno: any, erro: any) => {
            if (erro != null) {
              let jsonErro = new RetornoJsonErro({ codigo: 500, mensagem: "Erro no servidor [Gerar Arquivos Java]", erro: erro });
              res.status(500).send(jsonErro);
            } else {
              res.send(retorno);
            }
          });
          break; 
        case 'node':
          // let geradorNode = new GeradorNode();
          // geradorNode.gerarArquivos(tabela, (retorno: any, erro: any) => {
          //   if (erro != null) {
          //     let jsonErro = new RetornoJsonErro({ codigo: 500, mensagem: "Erro no servidor [Gerar Arquivos Node]", erro: erro });
          //     res.status(500).send(jsonErro);
          //   } else {
          //     res.send(retorno);
          //   }
          // });
          break;
        case 'php':
          break;
        case 'flutter':
          break;
        default:
          console.log('Estranho, mas chegou aqui com essa liguagem não suportada: ' + linguagem + '.');
      }
    } else { 
      let jsonErro = new RetornoJsonErro({ codigo: 400, mensagem: "Erro no Servidor [Gerar Fontes] - Linguagem não suportada", erro: null});
      res.status(400).send(jsonErro);
    }
  }

  //rotas: /tabela
  public consultarLista(req: Request, res: Response) {
    TabelaService.consultarLista((lista: any, erro: any) => {
      if (erro != null) {
        let jsonErro = new RetornoJsonErro({ codigo: 500, mensagem: "Erro no servidor [Consultar Lista de Tabelas]", erro: erro });
        res.status(500).send(jsonErro);
      } else {
        res.send(lista);
      }
    });
  }

  //rotas: /tabela/:nomeTabela
  public consultarListaCampos(req: Request, res: Response) {
    TabelaService.consultarListaCampos(req.params.nomeTabela, (lista: any, erro: any) => {
      if (erro != null) {
        let jsonErro = new RetornoJsonErro({ codigo: 500, mensagem: "Erro no servidor [Consultar Lista de Campos]", erro: erro });
        res.status(500).send(jsonErro);
      } else {
        res.send(lista);
      }
    });
  }
}