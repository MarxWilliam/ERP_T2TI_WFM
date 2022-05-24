import * as fs from 'fs';
import * as lodash from 'lodash';
import * as Mustache from 'mustache';
import { TabelaService } from '../../service/tabela.service';
import { CamposModel } from '../../model/campos.model';
import { Relacionamento } from '../../model/relacionamento.model';
import { DelphiModel } from './delphi.model';
import { DelphiController } from './delphi.controller';
import { DelphiService } from './delphi.service';
import { GeradorBase } from '../../gerador/gerador.base';

export class GeradorDelphi extends GeradorBase {

  tabela: string;
  tabelaAgregada: string;
  dataPacket: CamposModel[];
  relacionamentos: Relacionamento[];  // relacionamentos da tabela que tenham como FK ID_'Tabela' diferente de Local

  caminhoFontes = 'I:/Doc/node/gerador.codigo/fontes/delphi/';
  arquivoTemplateModel = 'I:/Doc/node/gerador.codigo/template/delphi/Delphi.Model.mustache';
  arquivoTemplateController = 'I:/Doc/node/gerador.codigo/template/delphi/Delphi.Controller.mustache';
  arquivoTemplateService = 'I:/Doc/node/gerador.codigo/template/delphi/Delphi.Service.mustache';

  constructor() {
    super();
    //this.relacionamentos = new Array;
  }

  async gerarArquivos(tabela: string, result: (retorno: any, erro: any) => void) {
    // nome da tabela 
    this.tabela = tabela.toUpperCase();

    // criar o diretorio
    let retorno = await super.criaDiretorio(this.caminhoFontes + this.tabela);
    if (retorno != true) {
      return result(null, retorno);
    }

    // procura pelas tabelas agregadas para criar os relacionamentos de primeiro nível
    retorno = await this.gerarAgregadosPrimeiroNivel();
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
      await this.gerarController();
      // gera service
      await this.gerarService();

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
      let lista = await TabelaService.pegarCampos(tabela);
      this.dataPacket = lista;

      // verifica se a tabela que esta sendo utilizada neste momento é diferente da tabela principal
      // aqui geramos apenas os relacionamentos agregados onde a FK se encontra em uma outra tabela diferente da principal
      if (tabela != this.tabela) {
        // monta o nome do campo: Ex: ID_PESSOA
        let nomeCampoFK = 'ID_' + this.tabela.toUpperCase();

        // verifica se o campo FK tem algum comentario para inserir como relacionamento
        for (let i = 0; i < lista.length; i++) {
          if (lista[i].Field == nomeCampoFK && lista[i].Comment != '') {
            // vamos inserir apenas os relacionamentos cujo Side não seja 'Local', pois esses serão encontrados e tratados no Model
            if (!lista[i].Comment.includes('Local')) {
              if (this.relacionamentos == null) { 
                this.relacionamentos = new Array;
              }
              let objeto = new Relacionamento({ tabela: tabela, opcoes: lista[i].Comment });
              this.relacionamentos.push(objeto);
            }
            //break; // Eu que coloquei isso
          } //else if (lista[i].Field == nomeCampoFK && lista[i].Comment == '') { 
           // break;
          //}
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
      var modelJson = new DelphiModel(tabela, this.dataPacket, null);
    } else {
      var modelJson = new DelphiModel(tabela, this.dataPacket, this.relacionamentos);
    }
    let modelTemplate = fs.readFileSync(this.arquivoTemplateModel).toString();
    let modelGerado = Mustache.render(modelTemplate, modelJson);

    let nomeArquivo = lodash.camelCase(tabela);
    nomeArquivo = lodash.upperFirst(nomeArquivo);

    return super.gravarArquivo(this.caminhoFontes + this.tabela + '/' + nomeArquivo + '.pas', modelGerado);
  }


  /** 
   * Gera Controller para a tabela principal
   */
  async gerarController() {
    let modelJson = new DelphiController(this.tabela);
    let modelTemplate = fs.readFileSync(this.arquivoTemplateController).toString();
    let modelGerado = Mustache.render(modelTemplate, modelJson);

    let nomeArquivo = lodash.camelCase(this.tabela) + 'Controller';
    nomeArquivo = lodash.upperFirst(nomeArquivo);

    return super.gravarArquivo(this.caminhoFontes + this.tabela + '/' + nomeArquivo + '.pas', modelGerado);
  }

  /** 
   * Gera o Service para a tabela principal
   */
  async gerarService() {
    var modelJson = new DelphiService(this.tabela, this.dataPacket, this.relacionamentos);
    let modelTemplate = fs.readFileSync(this.arquivoTemplateService).toString();
    let modelGerado = Mustache.render(modelTemplate, modelJson);

    let nomeArquivo = lodash.camelCase(this.tabela) + 'Service';
    nomeArquivo = lodash.upperFirst(nomeArquivo);

    return super.gravarArquivo(this.caminhoFontes + this.tabela + '/' + nomeArquivo + '.pas', modelGerado);
  }
}