"use strict";
exports.__esModule = true;
exports.JavaModel = void 0;
var relacionamento_model_1 = require("../../model/relacionamento.model");
var lodash = require("lodash");
/// classe base que ajuda a gerar o model do Delphi usando o mustache
var JavaModel = /** @class */ (function () {
    function JavaModel(tabela, dataPacket, relacionamentos) {
        this.fields = []; // armazena os fields que são gerados
        this.properties = []; // armazena as properties que são gerados na unit
        this.fieldsObj = []; // armazena os objetos - relacionamentos OneToOne
        this.fieldsList = []; // armazena as listas - relacionamentos OneToMany 
        this.propertiesObj = []; // armazena as propertiy do tipo OneToOne
        this.propertiesList = []; // armazena as propertiy do tipo OneToMany
        // nome da classe
        this["class"] = lodash.camelCase(tabela);
        this["class"] = lodash.upperFirst(this["class"]);
        this.classLower = tabela.toLowerCase();
        this.fl = tabela.substring(0, 1);
        // arrays
        this.fields = [];
        this.properties = [];
        // fields e properties
        for (var i = 0; i < dataPacket.length; i++) {
            // define o nome do campo
            var nomeCampo = dataPacket[i].Field; //ID
            var nomeCampoUpper = nomeCampo.toUpperCase();
            var nomeCampoLower = nomeCampo.toLowerCase();
            var nomeCampoTabela = nomeCampo.toUpperCase();
            var nomeCampoJson = lodash.camelCase(nomeCampo);
            var nomeCampoFieldProperty = lodash.upperFirst(nomeCampoJson);
            var tipoDado = this.GetTipo(dataPacket[i].Type);
            // define o field
            var atributoNomeCampo = "";
            if (nomeCampoUpper == 'ID') {
                atributoNomeCampo = "@Id\n" + "\t@GeneratedValue(strategy = GenerationType.IDENTITY)\n\t";
            }
            var field = atributoNomeCampo + 'private ' + tipoDado + ' ' + nomeCampoLower + ';';
            this.fields.push(field);
            ////////////////////////////////////////////////////////
            // define a property
            var metodoGet = "public " + tipoDado + " " + "get" + nomeCampoFieldProperty + "(){\n\t\t" +
                "return this." + nomeCampoLower + ";\n\t}";
            var metodoSet = "\tpublic " + tipoDado + " " + "set" + nomeCampoFieldProperty + "(" + tipoDado + " " + nomeCampoLower + "){\n\t\t" +
                "this." + nomeCampoLower + " = " + nomeCampoLower + ";\n\t}";
            var metodos = metodoGet + '\n\n' + metodoSet + '\n';
            this.properties.push(metodos);
            // se houver um campo PK e o Side for 'Local' adiciona o objeto da classe pai no relacionamento
            if (nomeCampoTabela.includes('ID_')) {
                if (dataPacket[i].Comment.includes('Local')) {
                    var tabela_1 = lodash.replace(nomeCampoTabela, 'ID_', '');
                    var objeto = new relacionamento_model_1.Relacionamento({ tabela: tabela_1, opcoes: dataPacket[i].Comment });
                    if (this.relacionamentosDetalhe == null) {
                        this.relacionamentosDetalhe = new Array;
                    }
                    this.relacionamentosDetalhe.push(objeto); //se tiver algo local da classe pai
                }
            }
        }
        // relacionamentos agregados ao Mestre
        if (relacionamentos != null) {
            this.tratarRelacionamentos(relacionamentos);
        }
        // relacionamentos agregados ao detalhe
        if (this.relacionamentosDetalhe != null) {
            this.tratarRelacionamentos(this.relacionamentosDetalhe);
        }
    }
    JavaModel.prototype.tratarRelacionamentos = function (relacionamentos) {
        for (var i = 0; i < relacionamentos.length; i++) {
            var nomeCampo = relacionamentos[i].Tabela;
            var nomeCampoJson = lodash.camelCase(nomeCampo);
            var nomeCampoFieldProperty = lodash.upperFirst(nomeCampoJson);
            // uses
            //this.uses = this.uses + nomeCampoFieldProperty + ', ';
            // verifica a cardinalidade para definir o nome do field
            if (relacionamentos[i].Cardinalidade == '@OneToOne') {
                // //bi-directional many-to-one association to PessoaFisica
                // @OneToOne(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
                // private PessoaFisica pessoaFisica;
                // define o field - objeto
                var field = '//bi-directional many-to-one association to ' + nomeCampoFieldProperty
                    + '@OneToOne(mappedBy="' + this["class"] + '", cascade = CascadeType.ALL, orphanRemoval = true)\n'
                    + '\tprivate ' + nomeCampoFieldProperty + ' ' + nomeCampoJson + ';\n';
                this.fieldsObj.push(field);
                // public PessoaFisica getPessoaFisica() {
                //     return this.pessoaFisica;
                // }
                // public void setPessoaFisica(PessoaFisica pessoaFisica) {
                //     this.pessoaFisica = pessoaFisica;
                //     this.pessoaFisica.setPessoa(this);
                // }
                // define a property
                var propertyGet = 'public ' + nomeCampoFieldProperty + ' get' + nomeCampoFieldProperty + '() {\n\t\treturn this.' + nomeCampoJson + ';\n\t}\n';
                this.propertiesObj.push(propertyGet);
                // construtor
                var propertySet = 'public void ' + 'set' + nomeCampoFieldProperty
                    + '(' + nomeCampoFieldProperty + ' ' + nomeCampoJson + ')'
                    + ' {\n\t\tthis.' + nomeCampoJson + ' = ' + nomeCampoJson + ';\n\t\tthis.' + nomeCampoJson + '.set' + this["class"] + '(this);\n\t}\n';
                this.propertiesObj.push(propertySet);
                // destrutor
                //let releaseField = '  FreeAndNil(F' + nomeCampoFieldProperty + ');';
                //this.destImplementation.push(releaseField);
            }
            else if (relacionamentos[i].Cardinalidade == '@OneToMany') {
                // //bi-directional many-to-one association to PessoaTelefone
                // @OneToMany(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
                // private Set<PessoaTelefone> listaPessoaTelefone;
                // define o field - objeto
                var field = '//bi-directional many-to-one association to ' + nomeCampoFieldProperty
                    + '@OneToMany(mappedBy="' + this["class"] + '", cascade = CascadeType.ALL, orphanRemoval = true)\n'
                    + '\tprivate Set<' + nomeCampoFieldProperty + '> lista' + nomeCampoFieldProperty + ';\n';
                this.fieldsList.push(field);
                // public Set<PessoaTelefone> getListaPessoaTelefone() {
                //     return this.listaPessoaTelefone;
                // }
                // public void setListaPessoaTelefone(Set<PessoaTelefone> listaPessoaTelefone) {
                //     this.listaPessoaTelefone = listaPessoaTelefone;
                //     for(PessoaTelefone pessoaTelefone : this.listaPessoaTelefone) {
                //         pessoaTelefone.setPessoa(this);
                //     }
                // }
                // define a property
                var propertyGet = 'public Set<' + nomeCampoFieldProperty + '> getLista' + nomeCampoFieldProperty + '() {\n\t\treturn this.lista' + nomeCampoFieldProperty + ';\n\t}\n';
                this.propertiesList.push(propertyGet);
                // construtor
                var propertySet = 'public void ' + 'setLista' + nomeCampoFieldProperty + '(Set<'
                    + '(' + nomeCampoFieldProperty + '> ' + nomeCampoJson + ')'
                    + ' {\n\t\tthis.lista' + nomeCampoFieldProperty + ' = lista' + nomeCampoFieldProperty + ';\n'
                    + '\t\tfor(' + nomeCampoFieldProperty + nomeCampoJson + ' : this.lista' + nomeCampoFieldProperty + ') {\n\t\t\t'
                    + nomeCampoJson + '.set' + this["class"] + '(this);\n\t\t}\n'
                    + '\t}\n';
                this.propertiesList.push(propertySet);
            }
        }
    };
    // define o tipo de dado
    JavaModel.prototype.GetTipo = function (pType) {
        if (pType.includes('int')) {
            return 'Integer';
        }
        else if (pType.includes('letchar')) {
            return 'String';
        }
        else if (pType.includes('decimal')) {
            return 'double';
        }
        else if (pType.includes('char')) {
            return 'String';
        }
        else if (pType.includes('date')) {
            return 'DateTime';
        }
    };
    return JavaModel;
}());
exports.JavaModel = JavaModel;
//module.exports = JavaModel;
