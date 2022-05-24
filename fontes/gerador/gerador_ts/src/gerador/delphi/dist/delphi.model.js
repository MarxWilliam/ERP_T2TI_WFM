"use strict";
exports.__esModule = true;
exports.DelphiModel = void 0;
var lodash = require("lodash");
var relacionamento_model_1 = require("../../model/relacionamento.model");
/// classe base que ajuda a gerar o model do Delphi usando o mustache
var DelphiModel = /** @class */ (function () {
    function DelphiModel(tabela, dataPacket, relacionamentos) {
        this.fields = []; // armazena os fields que são gerados na unit
        this.properties = []; // armazena as properties que são gerados na unit
        this.fieldsObj = []; // armazena os objetos - relacionamentos OneToOne
        this.fieldsList = []; // armazena as listas - relacionamentos OneToMany 
        this.constDestInterface = []; // armazena as declarações do construtor e destrutor
        this.propertiesObj = []; // armazena as propertiy do tipo OneToOne
        this.propertiesList = []; // armazena as propertiy do tipo OneToMany
        this.constImplementation = []; // armazena a implemenntação do construtor
        this.destImplementation = []; // armazena a implemenntação do destrutor
        // nome da classe
        this["class"] = lodash.camelCase(tabela);
        this["class"] = lodash.upperFirst(this["class"]);
        //nome da tabela
        this.table = tabela.toUpperCase();
        // fields e properties  
        for (var i = 0; i < dataPacket.length; i++) {
            // define o nome do campo
            var nomeCampo = dataPacket[i].Field; //ID
            var nomeCampoTabela = nomeCampo.toUpperCase();
            var nomeCampoJson = lodash.camelCase(nomeCampo);
            var nomeCampoFieldProperty = lodash.upperFirst(nomeCampoJson);
            // se houver um campo PK e o Side for 'Local' adiciona o objeto da classe pai no relacionamento
            if (nomeCampoTabela.includes('ID_')) {
                if (dataPacket[i].Comment.includes('Local')) {
                    var tabela_1 = lodash.replace(nomeCampoTabela, 'ID_', '');
                    var objeto = new relacionamento_model_1.Relacionamento({ tabela: tabela_1, opcoes: dataPacket[i].Comment });
                    if (this.relacionamentosDetalhe == null) {
                        this.relacionamentosDetalhe = new Array;
                    }
                    this.relacionamentosDetalhe.push(objeto);
                }
            }
            var tipoDado = this.getTipo(dataPacket[i].Type);
            // define o field
            var field = 'F' + nomeCampoFieldProperty + ': ' + tipoDado + ';';
            this.fields.push(field);
            // define a property
            var atributoNomeCampo = "[MVCColumnAttribute('" + nomeCampoTabela;
            if (nomeCampoTabela == 'ID') {
                atributoNomeCampo = atributoNomeCampo + "', True)]";
            }
            else {
                atributoNomeCampo = atributoNomeCampo + "')]";
            }
            var atributoNomeJson = "[MVCNameAsAttribute('" + nomeCampoJson + "')]";
            var property = 'property ' + nomeCampoFieldProperty + ': ' + tipoDado + ' read F' + nomeCampoFieldProperty + ' write F' + nomeCampoFieldProperty + ';';
            var atributosComPropriedade = atributoNomeCampo + '\n\t' + atributoNomeJson + '\n\t' + property;
            this.properties.push(atributosComPropriedade);
        }
        // relacionamentos agregados ao Mestre
        if (relacionamentos != null) {
            this.tratarUses();
            this.abrirConstrutorDestrutor();
            this.tratarRelacionamentos(relacionamentos);
            this.fecharConstrutorDestrutor();
        }
        // relacionamentos agregados ao detalhe
        if (this.relacionamentosDetalhe != null) {
            this.tratarUses();
            this.abrirConstrutorDestrutor();
            this.tratarRelacionamentos(this.relacionamentosDetalhe);
            this.fecharConstrutorDestrutor();
        }
    }
    DelphiModel.prototype.tratarUses = function () {
        //uses
        this.uses = 'Generics.Collections, System.SysUtils,\n';
    };
    DelphiModel.prototype.abrirConstrutorDestrutor = function () {
        // construtor e destrutor na interface
        this.constDestInterface.push('constructor Create; virtual;');
        this.constDestInterface.push('destructor Destroy; override;\n');
        // construtor na implementation - abre 
        this.constImplementation.push('constructor T' + this["class"] + '.Create;');
        this.constImplementation.push('begin');
        // destrutor na implementation - abre  
        this.destImplementation.push('destructor T' + this["class"] + '.Destroy;');
        this.destImplementation.push('begin');
    };
    DelphiModel.prototype.fecharConstrutorDestrutor = function () {
        // se ocorrer de não haver objetos ou listas, limpa o construtor o destrutor e o uses.
        if (this.propertiesObj.length == 0 && this.propertiesList.length == 0) {
            this.uses = '';
            this.constDestInterface.length = 0;
            this.constImplementation.length = 0;
            this.destImplementation.length = 0;
        }
        else {
            // constructor na implementation - fecha 
            this.constImplementation.push('end;');
            // destrutor na implementation - fecha
            this.destImplementation.push('  inherited;');
            this.destImplementation.push('end;');
        }
    };
    DelphiModel.prototype.tratarRelacionamentos = function (relacionamentos) {
        for (var i = 0; i < relacionamentos.length; i++) {
            var nomeCampo = relacionamentos[i].Tabela;
            var nomeCampoJson = lodash.camelCase(nomeCampo);
            var nomeCampoFieldProperty = lodash.upperFirst(nomeCampoJson);
            // uses
            this.uses = this.uses + nomeCampoFieldProperty + ', ';
            // verifica a cardinalidade para definir o nome do field
            if (relacionamentos[i].Cardinalidade == '@OneToOne') {
                // define o field - objeto
                var field = 'F' + nomeCampoFieldProperty + ': T' + nomeCampoFieldProperty + ';';
                this.fieldsObj.push(field);
                // define a property
                var atributoNomeJson = "[MVCNameAsAttribute('" + nomeCampoJson + "')]";
                var property = 'property ' + nomeCampoFieldProperty + ': T' + nomeCampoFieldProperty + 'read F' + nomeCampoFieldProperty + ' write F' + nomeCampoFieldProperty + ';';
                var atributosComPropriedade = atributoNomeJson + '\n\t' + property;
                this.propertiesObj.push(atributosComPropriedade);
                // construtor
                var createField = '  F' + nomeCampoFieldProperty + ' := ' + 'T' + nomeCampoFieldProperty + '.Create;';
                this.constImplementation.push(createField);
                // destrutor
                var releaseField = '  FreeAndNil(F' + nomeCampoFieldProperty + ');';
                this.destImplementation.push(releaseField);
            }
            else if (relacionamentos[i].Cardinalidade == '@OneToMany') {
                // define o field - lista
                var field = 'FLista' + nomeCampoFieldProperty + ': TObjectList<T' + nomeCampoFieldProperty + '>;';
                this.fieldsList.push(field);
                // define a property
                var atributoMapperList = '[MapperListOf(T' + nomeCampoFieldProperty + ')]';
                var atributoNomeJson = "[MVCNameAsAttribute('lista" + nomeCampoFieldProperty + "')]";
                var property = 'property Lista' + nomeCampoFieldProperty + ': TObjectList<T' + nomeCampoFieldProperty + '> read FLista' + nomeCampoFieldProperty + ' write FLista' + nomeCampoFieldProperty + ';';
                var atributosComPropriedade = atributoMapperList + '\n\t' + atributoNomeJson + '\n\t' + property;
                this.propertiesList.push(atributosComPropriedade);
                // construtor
                var createField = '  FLista' + nomeCampoFieldProperty + ' := ' + 'TObjectList<T' + nomeCampoFieldProperty + '>.Create;';
                this.constImplementation.push(createField);
                // destrutor
                var releaseField = '  FreeAndNil(FLista' + nomeCampoFieldProperty + ');';
                this.destImplementation.push(releaseField);
            }
        }
    };
    // define o tipo de dado
    DelphiModel.prototype.getTipo = function (pType) {
        if (pType.includes('int')) {
            return 'Integer';
        }
        else if (pType.includes('varchar')) {
            return 'String';
        }
        else if (pType.includes('decimal')) {
            return 'Extend';
        }
        else if (pType.includes('char')) {
            return 'string';
        }
        else if (pType.includes('date')) {
            return 'TDateTime';
        }
    };
    return DelphiModel;
}());
exports.DelphiModel = DelphiModel;
