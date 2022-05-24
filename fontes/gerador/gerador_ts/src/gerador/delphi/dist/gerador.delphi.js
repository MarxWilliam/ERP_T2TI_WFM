"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GeradorDelphi = void 0;
var fs = require("fs");
var lodash = require("lodash");
var Mustache = require("mustache");
var tabela_service_1 = require("../../service/tabela.service");
var relacionamento_model_1 = require("../../model/relacionamento.model");
var delphi_model_1 = require("./delphi.model");
var delphi_controller_1 = require("./delphi.controller");
var delphi_service_1 = require("./delphi.service");
var gerador_base_1 = require("../../gerador/gerador.base");
var GeradorDelphi = /** @class */ (function (_super) {
    __extends(GeradorDelphi, _super);
    function GeradorDelphi() {
        var _this = _super.call(this) || this;
        _this.caminhoFontes = 'I:/Doc/node/gerador.codigo/fontes/delphi/';
        _this.arquivoTemplateModel = 'I:/Doc/node/gerador.codigo/template/delphi/Delphi.Model.mustache';
        _this.arquivoTemplateController = 'I:/Doc/node/gerador.codigo/template/delphi/Delphi.Controller.mustache';
        _this.arquivoTemplateService = 'I:/Doc/node/gerador.codigo/template/delphi/Delphi.Service.mustache';
        return _this;
        //this.relacionamentos = new Array;
    }
    GeradorDelphi.prototype.gerarArquivos = function (tabela, result) {
        return __awaiter(this, void 0, void 0, function () {
            var retorno;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // nome da tabela 
                        this.tabela = tabela.toUpperCase();
                        return [4 /*yield*/, _super.prototype.criaDiretorio.call(this, this.caminhoFontes + this.tabela)];
                    case 1:
                        retorno = _a.sent();
                        if (retorno != true) {
                            return [2 /*return*/, result(null, retorno)];
                        }
                        return [4 /*yield*/, this.gerarAgregadosPrimeiroNivel()];
                    case 2:
                        // procura pelas tabelas agregadas para criar os relacionamentos de primeiro nível
                        retorno = _a.sent();
                        if (retorno != true) {
                            return [2 /*return*/, result(null, retorno)];
                        }
                        return [4 /*yield*/, this.gerarArquivosTabelaPrincipal()];
                    case 3:
                        retorno = _a.sent();
                        if (retorno != true) {
                            return [2 /*return*/, result(null, retorno)];
                        }
                        // retorno menssagem OK
                        result({ mensagem: "Arquivos gerados com sucesso!" }, null);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Encontrar todas as tabelas agregadas apartir da chave estrangeira e gera os arquivos de modelo
     * Não procuraremos por tabelas de segundo nível, apenas as de primeiro nível vinculadas diretamente
     * à tabela principal que foi enviada pelo usuario
     */
    GeradorDelphi.prototype.gerarAgregadosPrimeiroNivel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lista, index, erro_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, tabela_service_1.TabelaService.consultarAgregados(this.tabela)];
                    case 1:
                        lista = _a.sent();
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < lista.length)) return [3 /*break*/, 6];
                        this.tabelaAgregada = lista[index].TABLE_NAME;
                        // pegar campos da tabela agregada
                        return [4 /*yield*/, this.pegarCampos(this.tabelaAgregada)];
                    case 3:
                        // pegar campos da tabela agregada
                        _a.sent();
                        // gerar o modelo para a tabela agregada
                        return [4 /*yield*/, this.gerarModel(this.tabelaAgregada)];
                    case 4:
                        // gerar o modelo para a tabela agregada
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        index++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, true];
                    case 7:
                        erro_1 = _a.sent();
                        return [2 /*return*/, erro_1];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gerar arquivos tabela principal
     */
    GeradorDelphi.prototype.gerarArquivosTabelaPrincipal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var erro_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        // pega os campos para tabela
                        return [4 /*yield*/, this.pegarCampos(this.tabela)];
                    case 1:
                        // pega os campos para tabela
                        _a.sent();
                        // gera Model
                        return [4 /*yield*/, this.gerarModel(this.tabela)];
                    case 2:
                        // gera Model
                        _a.sent();
                        // gera controller
                        return [4 /*yield*/, this.gerarController()];
                    case 3:
                        // gera controller
                        _a.sent();
                        // gera service
                        return [4 /*yield*/, this.gerarService()];
                    case 4:
                        // gera service
                        _a.sent();
                        return [2 /*return*/, true];
                    case 5:
                        erro_2 = _a.sent();
                        return [2 /*return*/, erro_2];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Pega as colunas de determinada tabela e atribui ao dataPacket (Variável de Classe)
     */
    GeradorDelphi.prototype.pegarCampos = function (tabela) {
        return __awaiter(this, void 0, void 0, function () {
            var lista, nomeCampoFK, i, objeto, erro_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, tabela_service_1.TabelaService.pegarCampos(tabela)];
                    case 1:
                        lista = _a.sent();
                        this.dataPacket = lista;
                        // verifica se a tabela que esta sendo utilizada neste momento é diferente da tabela principal
                        // aqui geramos apenas os relacionamentos agregados onde a FK se encontra em uma outra tabela diferente da principal
                        if (tabela != this.tabela) {
                            nomeCampoFK = 'ID_' + this.tabela.toUpperCase();
                            // verifica se o campo FK tem algum comentario para inserir como relacionamento
                            for (i = 0; i < lista.length; i++) {
                                if (lista[i].Field == nomeCampoFK && lista[i].Comment != '') {
                                    // vamos inserir apenas os relacionamentos cujo Side não seja 'Local', pois esses serão encontrados e tratados no Model
                                    if (!lista[i].Comment.includes('Local')) {
                                        if (this.relacionamentos == null) {
                                            this.relacionamentos = new Array;
                                        }
                                        objeto = new relacionamento_model_1.Relacionamento({ tabela: tabela, opcoes: lista[i].Comment });
                                        this.relacionamentos.push(objeto);
                                    }
                                    //break; // Eu que coloquei isso
                                } //else if (lista[i].Field == nomeCampoFK && lista[i].Comment == '') { 
                                // break;
                                //}
                            }
                        }
                        return [2 /*return*/, true];
                    case 2:
                        erro_3 = _a.sent();
                        return [2 /*return*/, erro_3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gera o Model - serve para a tabela principal e também para as tabelas agregadas
     */
    GeradorDelphi.prototype.gerarModel = function (tabela) {
        return __awaiter(this, void 0, void 0, function () {
            var modelJson, modelJson, modelTemplate, modelGerado, nomeArquivo;
            return __generator(this, function (_a) {
                if (tabela != this.tabela) {
                    modelJson = new delphi_model_1.DelphiModel(tabela, this.dataPacket, null);
                }
                else {
                    modelJson = new delphi_model_1.DelphiModel(tabela, this.dataPacket, this.relacionamentos);
                }
                modelTemplate = fs.readFileSync(this.arquivoTemplateModel).toString();
                modelGerado = Mustache.render(modelTemplate, modelJson);
                nomeArquivo = lodash.camelCase(tabela);
                nomeArquivo = lodash.upperFirst(nomeArquivo);
                return [2 /*return*/, _super.prototype.gravarArquivo.call(this, this.caminhoFontes + this.tabela + '/' + nomeArquivo + '.pas', modelGerado)];
            });
        });
    };
    /**
     * Gera Controller para a tabela principal
     */
    GeradorDelphi.prototype.gerarController = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modelJson, modelTemplate, modelGerado, nomeArquivo;
            return __generator(this, function (_a) {
                modelJson = new delphi_controller_1.DelphiController(this.tabela);
                modelTemplate = fs.readFileSync(this.arquivoTemplateController).toString();
                modelGerado = Mustache.render(modelTemplate, modelJson);
                nomeArquivo = lodash.camelCase(this.tabela) + 'Controller';
                nomeArquivo = lodash.upperFirst(nomeArquivo);
                return [2 /*return*/, _super.prototype.gravarArquivo.call(this, this.caminhoFontes + this.tabela + '/' + nomeArquivo + '.pas', modelGerado)];
            });
        });
    };
    /**
     * Gera o Service para a tabela principal
     */
    GeradorDelphi.prototype.gerarService = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modelJson, modelTemplate, modelGerado, nomeArquivo;
            return __generator(this, function (_a) {
                modelJson = new delphi_service_1.DelphiService(this.tabela, this.dataPacket, this.relacionamentos);
                modelTemplate = fs.readFileSync(this.arquivoTemplateService).toString();
                modelGerado = Mustache.render(modelTemplate, modelJson);
                nomeArquivo = lodash.camelCase(this.tabela) + 'Service';
                nomeArquivo = lodash.upperFirst(nomeArquivo);
                return [2 /*return*/, _super.prototype.gravarArquivo.call(this, this.caminhoFontes + this.tabela + '/' + nomeArquivo + '.pas', modelGerado)];
            });
        });
    };
    return GeradorDelphi;
}(gerador_base_1.GeradorBase));
exports.GeradorDelphi = GeradorDelphi;
