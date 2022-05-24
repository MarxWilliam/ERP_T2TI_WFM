import * as lodash from 'lodash';
import { Relacionamento } from '../../model/relacionamento.model';
import { idText } from 'typescript';
import { CamposModel } from '../../model/campos.model';

/// classe base que ajuda a gerar o model do Delphi usando o mustache
export class DelphiModel {
    uses: string; // armazena as uses que serão inseridas no início da unit
    table: string; // armazena o nome da tabela
    class: string; // armazena o nome da classe
    fields = []; // armazena os fields que são gerados na unit
    properties = []; // armazena as properties que são gerados na unit
    fieldsObj = []; // armazena os objetos - relacionamentos OneToOne
    fieldsList = []; // armazena as listas - relacionamentos OneToMany 
    constDestInterface = []; // armazena as declarações do construtor e destrutor
    propertiesObj = []; // armazena as propertiy do tipo OneToOne
    propertiesList = []; // armazena as propertiy do tipo OneToMany
    constImplementation = []; // armazena a implemenntação do construtor
    destImplementation = []; // armazena a implemenntação do destrutor

    relacionamentosDetalhe: Relacionamento[]; // armazena relacionamentos de uma tabela detalhe que serão encontrado aqui no Model

    constructor(tabela: string, dataPacket: CamposModel[], relacionamentos: Relacionamento[]) {
        // nome da classe
        this.class = lodash.camelCase(tabela);
        this.class = lodash.upperFirst(this.class);

        //nome da tabela
        this.table = tabela.toUpperCase();



        // fields e properties  
        for (let i = 0; i < dataPacket.length; i++) {
            // define o nome do campo
            let nomeCampo = dataPacket[i].Field; //ID

            let nomeCampoTabela = nomeCampo.toUpperCase();
            let nomeCampoJson = lodash.camelCase(nomeCampo);
            let nomeCampoFieldProperty = lodash.upperFirst(nomeCampoJson);

            // se houver um campo PK e o Side for 'Local' adiciona o objeto da classe pai no relacionamento
            if (nomeCampoTabela.includes('ID_')) {
                if (dataPacket[i].Comment.includes('Local')) {
                    let tabela = lodash.replace(nomeCampoTabela, 'ID_', '');
                    let objeto = new Relacionamento({ tabela: tabela, opcoes: dataPacket[i].Comment });
                    if (this.relacionamentosDetalhe == null) {
                        this.relacionamentosDetalhe = new Array;
                    }
                    this.relacionamentosDetalhe.push(objeto);
                }
            }


            let tipoDado = this.getTipo(dataPacket[i].Type);

            // define o field
            let field = 'F' + nomeCampoFieldProperty + ': ' + tipoDado + ';';
            this.fields.push(field);

            // define a property
            let atributoNomeCampo = "[MVCColumnAttribute('" + nomeCampoTabela;
            if (nomeCampoTabela == 'ID') {
                atributoNomeCampo = atributoNomeCampo + "', True)]";
            } else {
                atributoNomeCampo = atributoNomeCampo + "')]";
            }

            let atributoNomeJson = "[MVCNameAsAttribute('" + nomeCampoJson + "')]";
            let property = 'property ' + nomeCampoFieldProperty + ': ' + tipoDado + ' read F' + nomeCampoFieldProperty + ' write F' + nomeCampoFieldProperty + ';';

            let atributosComPropriedade = atributoNomeCampo + '\n\t' + atributoNomeJson + '\n\t' + property;

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
    tratarUses() {
        //uses
        this.uses = 'Generics.Collections, System.SysUtils,\n';
    }

    abrirConstrutorDestrutor() {
        // construtor e destrutor na interface
        this.constDestInterface.push('constructor Create; virtual;');
        this.constDestInterface.push('destructor Destroy; override;\n');

        // construtor na implementation - abre 
        this.constImplementation.push('constructor T' + this.class + '.Create;');
        this.constImplementation.push('begin');

        // destrutor na implementation - abre  
        this.destImplementation.push('destructor T' + this.class + '.Destroy;');
        this.destImplementation.push('begin');
    }


    fecharConstrutorDestrutor() {
        // se ocorrer de não haver objetos ou listas, limpa o construtor o destrutor e o uses.
        if (this.propertiesObj.length == 0 && this.propertiesList.length == 0) {
            this.uses = '';
            this.constDestInterface.length = 0;
            this.constImplementation.length = 0;
            this.destImplementation.length = 0;
        } else {
            // constructor na implementation - fecha 
            this.constImplementation.push('end;');

            // destrutor na implementation - fecha
            this.destImplementation.push('  inherited;');
            this.destImplementation.push('end;');
        }
    }

    tratarRelacionamentos(relacionamentos: Relacionamento[]) { 
        for (let i = 0; i < relacionamentos.length; i++) { 
            let nomeCampo = relacionamentos[i].Tabela;
            let nomeCampoJson = lodash.camelCase(nomeCampo);
            let nomeCampoFieldProperty = lodash.upperFirst(nomeCampoJson);

            // uses
            this.uses = this.uses + nomeCampoFieldProperty + ', ';

            // verifica a cardinalidade para definir o nome do field
            if (relacionamentos[i].Cardinalidade == '@OneToOne') { 
                // define o field - objeto
                let field = 'F' + nomeCampoFieldProperty + ': T' + nomeCampoFieldProperty + ';';
                this.fieldsObj.push(field);

                // define a property
                let atributoNomeJson = "[MVCNameAsAttribute('" + nomeCampoJson + "')]";
                let property = 'property ' + nomeCampoFieldProperty + ': T' + nomeCampoFieldProperty + 'read F' + nomeCampoFieldProperty + ' write F' + nomeCampoFieldProperty + ';'; 
                let atributosComPropriedade = atributoNomeJson + '\n\t' + property;    
                this.propertiesObj.push(atributosComPropriedade);
                // construtor
                let createField = '  F' + nomeCampoFieldProperty + ' := ' + 'T' + nomeCampoFieldProperty + '.Create;';
                this.constImplementation.push(createField);
                // destrutor
                let releaseField = '  FreeAndNil(F' + nomeCampoFieldProperty + ');';
                this.destImplementation.push(releaseField);

            } else if (relacionamentos[i].Cardinalidade == '@OneToMany') { 
                // define o field - lista
                let field = 'FLista' + nomeCampoFieldProperty + ': TObjectList<T' + nomeCampoFieldProperty + '>;';
                this.fieldsList.push(field);

                // define a property
                let atributoMapperList = '[MapperListOf(T' + nomeCampoFieldProperty + ')]';
                let atributoNomeJson = "[MVCNameAsAttribute('lista" + nomeCampoFieldProperty + "')]";
                let property = 'property Lista' + nomeCampoFieldProperty + ': TObjectList<T' + nomeCampoFieldProperty + '> read FLista' + nomeCampoFieldProperty + ' write FLista' + nomeCampoFieldProperty + ';'; 
                let atributosComPropriedade = atributoMapperList + '\n\t' + atributoNomeJson + '\n\t' + property;    
                this.propertiesList.push(atributosComPropriedade);
                // construtor
                let createField = '  FLista' + nomeCampoFieldProperty + ' := ' + 'TObjectList<T' + nomeCampoFieldProperty + '>.Create;';
                this.constImplementation.push(createField);
                // destrutor
                let releaseField = '  FreeAndNil(FLista' + nomeCampoFieldProperty + ');';
                this.destImplementation.push(releaseField);
                
            }
        }
    }

    // define o tipo de dado
    getTipo(pType: any): string {
        if (pType.includes('int')) {
            return 'Integer';
        } else if (pType.includes('varchar')) {
            return 'String';
        } else if (pType.includes('decimal')) {
            return 'Extend';
        } else if (pType.includes('char')) {
            return 'string';
        } else if (pType.includes('date')) {
            return 'TDateTime';
        }
    }
}