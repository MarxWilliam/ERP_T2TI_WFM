"use strict";
exports.__esModule = true;
exports.DelphiService = void 0;
var lodash = require("lodash");
var relacionamento_model_1 = require("../../model/relacionamento.model");
/// classe base que ajuda a gerar o service do Delphi usando o mustache
var DelphiService = /** @class */ (function () {
    function DelphiService(tabela, dataPacket, relacionamentos) {
        this.anexaObjetosVinculadosInterface = []; // armazena o código da interface dos objetos vinculados
        this.anexaObjetosVinculadosImplementationObjetoAbertura = []; // armazena o código de abertura do método para o objeto
        this.anexaObjetosVinculadosImplementationObjetoFechamento = []; // armazena o código de fechamento do método para o objeto
        this.anexaObjetosVinculadosImplementationLista = []; // armazena o código do método para lista
        this.anexaObjetosVinculados = []; // armazena o código para anexar os objetos vinculados
        this.linkedListInserir = []; // armazena os objetos que são listas e são usados como variáveis locais no método inserir
        this.linkedListAlterar = []; // armazena o s objetos que são listas e são usados como variáveis locais no método Alterar
        this.insereObjetosVinculados = []; // armazena o código de inserção dos objetos vinculados
        this.alteraObjetosVinculados = []; // armazena o código de Alteração dos objetos vinculados
        this.excluiFilhos = []; // armazena o código para exclusão dos objetos filhos vinculados 
        // nome da classe
        this["class"] = lodash.camelCase(tabela);
        this["class"] = lodash.upperFirst(this["class"]);
        //nome da tabela
        this.table = tabela.toUpperCase();
        this.uses = this["class"] + ', ';
        for (var i = 0; i < dataPacket.length; i++) {
            // se houver um campo PK e o Side for 'Local' adiciona o objeto da classe pai no relacionamento
            if (dataPacket[i].Field.includes('ID_')) {
                if (dataPacket[i].Comment.includes('Local')) {
                    var tabela_1 = lodash.replace(dataPacket[i].Field, 'ID_', '');
                    var objeto = new relacionamento_model_1.Relacionamento({ tabela: tabela_1, opcoes: dataPacket[i].Comment });
                    if (this.relacionamentosDetalhe == null) {
                        this.relacionamentosDetalhe = new Array;
                    }
                    this.relacionamentosDetalhe.push(objeto);
                }
            }
        }
        // relacionamentos agregados ao mestre
        if (relacionamentos != null) {
            this.tratarMetodosObjetosVinculados(relacionamentos);
            this.gerarCodigoObjetosVinculados(relacionamentos);
        }
        if (this.relacionamentosDetalhe != null) {
            this.tratarMetodosObjetosVinculados(this.relacionamentosDetalhe);
            this.gerarCodigoObjetosVinculados(this.relacionamentosDetalhe);
        }
    }
    DelphiService.prototype.tratarMetodosObjetosVinculados = function (relacionamentos) {
        if (relacionamentos.length > 0) {
            // permite a chamada ao método
            this.chamaAnexarObjetosVinculados = 'Anexar Objetos Vinculados(Result);';
            // define os métodos anexarObjetosVinculados na interface
            var metodoLista = 'class procedure AnexarObjetosVinculados(const Lista' + this["class"] + ': TObjectList<T' + this["class"] + '>); overload;';
            this.anexaObjetosVinculadosInterface.push(metodoLista);
            var metodoObjeto = 'class procedure AnexarObjetosVinculados(const ' + this["class"] + ': T' + this["class"] + '); overload;';
            this.anexaObjetosVinculadosInterface.push(metodoObjeto);
            // define os métodos anexarObjetosVinculados na implementation
            var abrirMetodoObjeto = 'class procedure T' + this["class"] + 'Service.AnexarObjetosVinculados(const ' + this["class"] + ': T' + this["class"] + ');\nbegin';
            this.anexaObjetosVinculadosImplementationObjetoAbertura.push(abrirMetodoObjeto);
            this.anexaObjetosVinculadosImplementationObjetoFechamento.push('end;');
            metodoLista = 'class procedure T' + this["class"] + 'Service.AnexarObjetosVinculados(const Lista' + this["class"] + ': TObjectList<T' + this["class"] + '>);\nvar';
            this.anexaObjetosVinculadosImplementationLista.push(metodoLista);
            this.anexaObjetosVinculadosImplementationLista.push('  ' + this["class"] + ': T' + this["class"] + ';\nbegin');
            this.anexaObjetosVinculadosImplementationLista.push('  for ' + this["class"] + ' in Lista' + this["class"] + ' do');
            this.anexaObjetosVinculadosImplementationLista.push('  begin');
            this.anexaObjetosVinculadosImplementationLista.push('    AnexarObjetosVinculados(' + this["class"] + '); ');
            this.anexaObjetosVinculadosImplementationLista.push('  end;');
            this.anexaObjetosVinculadosImplementationLista.push('end;');
        }
    };
    DelphiService.prototype.gerarCodigoObjetosVinculados = function (relacionamentos) {
        for (var i = 0; i < relacionamentos.length; i++) {
            var tabelaRelacionamento = relacionamentos[i].Tabela.toUpperCase();
            var classeRelacionamento = lodash.camelCase(tabelaRelacionamento);
            classeRelacionamento = lodash.upperFirst(classeRelacionamento);
            // uses 
            this.uses = this.uses + classeRelacionamento + ', ';
            // comentario identificando o relacionamento
            var comentario = '// ' + classeRelacionamento + '\n';
            // começa anexando os objetos/listas vinculados
            var codigoAnexarObjeto = comentario;
            var sql = '';
            if (relacionamentos[i].Side == 'Inverse') {
                sql = "'SELECT * FROM " + tabelaRelacionamento + " WHERE ID_" + this.table + " = ' + " + this["class"] + ".Id.ToString;";
            }
            else if (relacionamentos[i].Side == 'Local') {
                sql = "'SELECT * FROM " + tabelaRelacionamento + " WHERE ID = ' + " + this["class"] + ".Id" + classeRelacionamento + ".ToString;";
            }
            codigoAnexarObjeto = codigoAnexarObjeto + ' sql := ' + sql + '\n';
            if (relacionamentos[i].Delete) {
                var codigoExclusao = 'ExcluirFilho(A' + this["class"] + ".Id, '" + tabelaRelacionamento + "', 'ID_" + this.table + "');";
                this.excluiFilhos.push(codigoExclusao);
            }
            // verifica a cardinalidade para definir o nome do field
            if (relacionamentos[i].Cardinalidade == '@OneToOne') {
                // anexar objetos vinculados
                var atribuiObjeto = '  ' + this["class"] + '.' + classeRelacionamento + ' := GetQuery(sql).AsObject<T' + classeRelacionamento + '>;';
                codigoAnexarObjeto = codigoAnexarObjeto + atribuiObjeto + '\n';
                this.anexaObjetosVinculados.push(codigoAnexarObjeto);
                // inserir Objetos Vinculados
                if (relacionamentos[i].Create) {
                    var atribuiId = '  A' + this["class"] + '.' + classeRelacionamento + '.Id' + this["class"] + ' := A' + this["class"] + '.Id;\n';
                    var insereBase = '  InserirBase(A' + this["class"] + '.' + classeRelacionamento + ", '" + tabelaRelacionamento + "');\n";
                    this.insereObjetosVinculados.push(comentario + atribuiId + insereBase);
                }
                // alterar objetos vinculados
                if (relacionamentos[i].Update) {
                    var testeIdMaiorZero = '  if A' + this["class"] + '.' + classeRelacionamento + '.Id > 0 then\n';
                    var alteraBase = " AlterarBase(A" + this["class"] + '.' + classeRelacionamento + ", '" + tabelaRelacionamento + "');\n";
                    var seNao = 'else\n  begin\n';
                    var atribuiId = '    A' + this["class"] + '.' + classeRelacionamento + '.Id' + this["class"] + ' := ' + 'A' + this["class"] + '.Id;\n';
                    var insereBase = "    InserirBase(A" + this["class"] + '.' + classeRelacionamento + ", '" + tabelaRelacionamento + "');\n";
                    var fechaSeNao = '  end;\n';
                    this.alteraObjetosVinculados.push(comentario + testeIdMaiorZero + alteraBase + seNao + atribuiId + insereBase + fechaSeNao);
                }
            }
            else if (relacionamentos[i].Cardinalidade == '@OneToMany') {
                // anexar listas vinculadas
                var atribuiLista = '  ' + this["class"] + '.Lista' + classeRelacionamento + ' := GetQuery(sql).AsObjectList<T' + classeRelacionamento + '>;';
                codigoAnexarObjeto = codigoAnexarObjeto + atribuiLista + '\n';
                this.anexaObjetosVinculados.push(codigoAnexarObjeto);
                // define os objetos que são listas - inserção
                if (relacionamentos[i].Create) {
                    if (this.linkedListInserir.length == 0) {
                        this.linkedListInserir.push('var');
                    }
                    var variavel = '  ' + classeRelacionamento + ' : T' + classeRelacionamento + ';';
                    this.linkedListInserir.push(variavel);
                }
                // define os objetos que são listas - alteração
                if (relacionamentos[i].Update) {
                    if (this.linkedListAlterar.length == 0) {
                        this.linkedListAlterar.push('var');
                    }
                    var variavel = '  ' + classeRelacionamento + ' : T' + classeRelacionamento + ';';
                    this.linkedListAlterar.push(variavel);
                }
                // inserir listas vinculadas
                if (relacionamentos[i].Create) {
                    var abreLaco = '  for ' + classeRelacionamento + ' in A' + this["class"] + '.Lista' + classeRelacionamento + 'do\n';
                    abreLaco = abreLaco + '  begin\n';
                    var atribuiId = '    ' + classeRelacionamento + '.Id' + this["class"] + ' := A' + this["class"] + '.Id;\n';
                    var insereBase = '    InserirBase(' + classeRelacionamento + ", '" + tabelaRelacionamento + "');\n";
                    var fechaLaco = '  end;\n';
                    this.insereObjetosVinculados.push(comentario + abreLaco + atribuiId + insereBase + fechaLaco);
                }
                // alterar listas vinculadas
                if (relacionamentos[i].Update) {
                    var abreLaco = '  for ' + classeRelacionamento + ' in A' + this["class"] + '.Lista' + classeRelacionamento + 'do\n';
                    abreLaco = abreLaco + '  begin\n';
                    var testeIdMaiorZero = '    if ' + classeRelacionamento + '.Id > 0 then\n';
                    var alteraBase = " AlterarBase(" + classeRelacionamento + ", '" + tabelaRelacionamento + "');\n";
                    var seNao = 'else\n  begin\n';
                    var atribuiId = '    ' + classeRelacionamento + '.Id' + this["class"] + ' := ' + 'A' + this["class"] + '.Id;\n';
                    var insereBase = "    InserirBase(" + classeRelacionamento + ", '" + tabelaRelacionamento + "');\n";
                    var fechaSeNao = '  end;\n';
                    var fechaLaco = '  end;\n';
                    this.alteraObjetosVinculados.push(comentario + abreLaco + testeIdMaiorZero + alteraBase + seNao + atribuiId + insereBase + fechaSeNao + fechaLaco);
                }
            }
        }
    };
    return DelphiService;
}());
exports.DelphiService = DelphiService;
