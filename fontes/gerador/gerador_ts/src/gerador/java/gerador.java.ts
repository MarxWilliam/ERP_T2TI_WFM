import { Request, Response } from 'express';
import * as Mustache from 'mustache';
import * as lodash from 'lodash';
import * as fs from 'fs';
import { GeradorBase } from '../gerador.base';
import { CamposModel } from '../../model/campos.model';
import { Relacionamento } from '../../model/relacionamento.model';
import { RetornoJsonErro } from "../../model/retorno.json.erro";
import { TabelaService } from '../../service/tabela.service';
import { JavaModel } from '../java/java.model';
import { JavaController } from './java.controller';
import { JavaService } from './java.service';
import { JavaRepository } from './java.repository';

export class GeradorJava extends GeradorBase {

  tabela: string;
  tabelaAgregada: string;
  dataPacket: CamposModel[];
  relacionamentos: Relacionamento[];  // relacionamentos da tabela chamada no REST

  caminhoFontes = 'I:/Doc/workspace-spring-tool-suite/fenix-gerado/src/main/java/com/t2ti/fenixgerado/';
  arquivoTemplateModel = 'I:/Doc/node/gerador.codigo/template/java/Java.Model.mustache';
  arquivoTemplateController = 'I:/Doc/node/gerador.codigo/template/java/Java.Controller.mustache';
  arquivoTemplateService = 'I:/Doc/node/gerador.codigo/template/java/Java.Service.mustache';
  arquivoTemplateRepository = 'I:/Doc/node/gerador.codigo/template/java/Java.Repository.mustache';

  constructor() {
    super();
    this.relacionamentos = new Array;
  }

  async gerarArquivos(tabela: string, result: (retorno: any, erro: any) => void) {
    // nome da tabela 
    this.tabela = tabela.toUpperCase();

    // criar o diretorio
    // let retorno = await super.criaDiretorio(this.caminhoFontes + this.tabela);
    // if (retorno != true) {
    //   return result(null, retorno);
    // }
    
    // procura pelas tabelas agregadas para criar os relacionamentos de primeiro nível
    let retorno = await this.gerarAgregadosPrimeiroNivel();
    if (retorno != true) {
      return result(null, retorno);
    }

    retorno = await this.gerarArquivosTabelaPrincipal();
    if (retorno != true) {
      return result(null, retorno);
    }

    // retorno menssagem OK
    result({ mensagem: "Arquivos gerados com sucesso!" }, null);
  }

  /** 
   * Encontrar todas as tabelas agregadas apartir da chave estrangeira e gera os arquivos de modelo
   * Não procuraremos por tabelas de segundo nível, apenas as de primeiro nível vinculadas diretamente
   * à tabela principal que foi enviada pelo usuario
   */
  async gerarAgregadosPrimeiroNivel() {
    try {
      let lista = await TabelaService.consultarAgregados(this.tabela);
      for (let index = 0; index < lista.length; index++) {
        this.tabelaAgregada = lista[index].TABLE_NAME;

        // pegar campos da tabela agregada
        await this.pegarCampos(this.tabelaAgregada);

        // gerar o modelo para a tabela agregada
        await this.gerarModel(this.tabelaAgregada);
      }
      return true;
    } catch (erro) {
      return erro;
    }
  }

  /** 
   * Gerar arquivos tabela principal
   */
  async gerarArquivosTabelaPrincipal() {
    try {
      // pega os campos para tabela
      await this.pegarCampos(this.tabela);
      // gera Model
      await this.gerarModel(this.tabela);
      // gera controller
      await this.geraController();
      // gera service
      await this.geraService();

      await this.geraRepository();

      return true;
    } catch (erro) {
      return erro;
    }
  }

  /** 
   * Pega as colunas de determinada tabela e atribui ao dataPacket (Variável de Classe)
   */
  async pegarCampos(tabela: string) {
    try {
      this.dataPacket = await TabelaService.pegarCampos(tabela); //show full columns from tabela

      // verifica se a tabela que esta sendo utilizada neste momento é diferente da tabela principal
      // aqui geramos apenas os relacionamentos agregados onde a FK se encontra em uma outra tabela diferente da principal
      if (tabela != this.tabela) {
        // monta o nome do campo: Ex: ID_PESSOA
        let nomeCampoFK = 'ID_' + this.tabela.toUpperCase();

        // verifica se o campo FK tem algum comentario para inserir como relacionamento
        for (let i = 0; i < this.dataPacket.length; i++) {
          if (this.dataPacket[i].Field == nomeCampoFK && this.dataPacket[i].Comment != '') {
            // vamos inserir apenas os relacionamentos cujo Side não seja 'Local', pois esses serão encontrados e tratados no Model
            if (this.dataPacket[i].Comment.includes('Inverse') || this.dataPacket[i].Comment.includes('Both')) {
              let objeto = new Relacionamento({ tabela: tabela, opcoes: this.dataPacket[i].Comment });
              this.relacionamentos.push(objeto);
            }
            break; // Eu William que coloquei isso
          } else if (this.dataPacket[i].Field == nomeCampoFK && this.dataPacket[i].Comment == '') { 
            break;
          }
        }
      }
      return true;
    } catch (erro) {
      return erro;
    }
  }

  /** 
   * Gera o Model - serve para a tabela principal e também para as tabelas agregadas
   */
  async gerarModel(tabela: string) {
    if (tabela != this.tabela) {
      var modelJson = new JavaModel(tabela, this.dataPacket, null);
    } else {
      var modelJson = new JavaModel(tabela, this.dataPacket, this.relacionamentos);
    }
    let modelTemplate = fs.readFileSync(this.arquivoTemplateModel).toString();
    let modelGerado = Mustache.render(modelTemplate, modelJson);


    try {
      let retorno = await super.criaDiretorio(this.caminhoFontes + 'model');
      let retorno2 = await super.criaDiretorio(this.caminhoFontes + 'model/cadastros');

      let nomeArquivo = lodash.camelCase(tabela);
      nomeArquivo = lodash.upperFirst(nomeArquivo);
      let path = this.caminhoFontes + 'model/cadastros/' + nomeArquivo + '.java';
      return super.gravarArquivo(path, modelGerado);
    } catch (erro) {
      return erro;
     }
  }


  /** 
   * Gera Controller para a tabela principal
   */
  async geraController() {
    var modelJson = new JavaController(this.tabela);
    let modelTemplate = fs.readFileSync(this.arquivoTemplateController).toString();
    let modelGerado = Mustache.render(modelTemplate, modelJson);

    try {
      let retorno = await super.criaDiretorio(this.caminhoFontes + 'controller');
      let retorno2 = await super.criaDiretorio(this.caminhoFontes + 'controller/cadastros');
    
      let nomeArquivo = lodash.camelCase(this.tabela) + 'Controller';
      nomeArquivo = lodash.upperFirst(nomeArquivo);
      let path = this.caminhoFontes + 'controller/cadastros/' + nomeArquivo + '.java';
      return super.gravarArquivo(path, modelGerado);
    } catch (erro) { 
      return erro;
    } 
  }

  /** 
   * Gera o Service para a tabela principal
   */
  async geraService() {
    var modelJson = new JavaService(this.tabela);
    let modelTemplate = fs.readFileSync(this.arquivoTemplateService).toString();
    let modelGerado = Mustache.render(modelTemplate, modelJson);

    try {
      let retorno = await super.criaDiretorio(this.caminhoFontes + 'services');
      let retorno2 = await super.criaDiretorio(this.caminhoFontes + 'services/cadastros');

      let nomeArquivo = lodash.camelCase(this.tabela) + 'Service';
      nomeArquivo = lodash.upperFirst(nomeArquivo);
      let path = this.caminhoFontes + 'services/cadastros/' + nomeArquivo + '.java';
      return super.gravarArquivo(path, modelGerado);
    } catch (erro) { 
      return erro;
    }
  }

    /** 
   * Gera o Service para a tabela principal
   */
  async geraRepository() {
    var modelJson = new JavaRepository(this.tabela);
    let modelTemplate = fs.readFileSync(this.arquivoTemplateRepository).toString();
    let modelGerado = Mustache.render(modelTemplate, modelJson);

    try {
      let retorno = await super.criaDiretorio(this.caminhoFontes + 'repository');
      let retorno2 = await super.criaDiretorio(this.caminhoFontes + 'repository/cadastros');

      let nomeArquivo = lodash.camelCase(this.tabela) + 'Repository';
      nomeArquivo = lodash.upperFirst(nomeArquivo);
      let path = this.caminhoFontes + 'repository/cadastros/' + nomeArquivo + '.java';
      return super.gravarArquivo(path, modelGerado);
    } catch (erro) { 
      return erro;
    }
  }
}