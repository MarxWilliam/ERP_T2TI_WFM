"use strict";
exports.__esModule = true;
exports.TabelaController = void 0;
var tabela_service_1 = require("../service/tabela.service");
//import { DelphiModel } from '../model/delphi.model');
var retorno_json_erro_1 = require("../model/retorno.json.erro");
var gerador_delphi_1 = require("../gerador/delphi/gerador.delphi");
var gerador_java_1 = require("../gerador/java/gerador.java");
var TabelaController = /** @class */ (function () {
    function TabelaController() {
    }
    TabelaController.prototype.gerarFontes = function (req, res) {
        var linguagens = ["c", "delphi", "java", "node", "php"];
        var linguagem = req.params.linguagem;
        var tabela = req.params.nomeTabela;
        // verifica se a linguagem enviada pelo usuario esta na lista de linguagens esperada
        if (linguagens.includes(linguagem)) {
            switch (linguagem) {
                case 'c':
                    break;
                case 'delphi':
                    var geradorDelphi = new gerador_delphi_1.GeradorDelphi();
                    geradorDelphi.gerarArquivos(tabela, function (retorno, erro) {
                        if (erro != null) {
                            var jsonErro = new retorno_json_erro_1.RetornoJsonErro({ codigo: 500, mensagem: "Erro no Servidor [Gerar Arquivos Delphi]", erro: erro });
                            res.status(500).send(jsonErro);
                        }
                        else {
                            res.send(retorno);
                        }
                    });
                    break;
                case 'java':
                    var geradorJava = new gerador_java_1.GeradorJava();
                    geradorJava.gerarArquivos(tabela, function (retorno, erro) {
                        if (erro != null) {
                            var jsonErro = new retorno_json_erro_1.RetornoJsonErro({ codigo: 500, mensagem: "Erro no servidor [Gerar Arquivos Java]", erro: erro });
                            res.status(500).send(jsonErro);
                        }
                        else {
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
        }
        else {
            var jsonErro = new retorno_json_erro_1.RetornoJsonErro({ codigo: 400, mensagem: "Erro no Servidor [Gerar Fontes] - Linguagem não suportada", erro: null });
            res.status(400).send(jsonErro);
        }
    };
    //rotas: /tabela
    TabelaController.prototype.consultarLista = function (req, res) {
        tabela_service_1.TabelaService.consultarLista(function (lista, erro) {
            if (erro != null) {
                var jsonErro = new retorno_json_erro_1.RetornoJsonErro({ codigo: 500, mensagem: "Erro no servidor [Consultar Lista de Tabelas]", erro: erro });
                res.status(500).send(jsonErro);
            }
            else {
                res.send(lista);
            }
        });
    };
    //rotas: /tabela/:nomeTabela
    TabelaController.prototype.consultarListaCampos = function (req, res) {
        tabela_service_1.TabelaService.consultarListaCampos(req.params.nomeTabela, function (lista, erro) {
            if (erro != null) {
                var jsonErro = new retorno_json_erro_1.RetornoJsonErro({ codigo: 500, mensagem: "Erro no servidor [Consultar Lista de Campos]", erro: erro });
                res.status(500).send(jsonErro);
            }
            else {
                res.send(lista);
            }
        });
    };
    return TabelaController;
}());
exports.TabelaController = TabelaController;
