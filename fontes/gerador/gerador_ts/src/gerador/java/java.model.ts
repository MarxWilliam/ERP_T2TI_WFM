import * as capitalize from 'capitalize';
import { CamposModel } from '../../model/campos.model';
import { Relacionamento } from '../../model/relacionamento.model';
import * as lodash from 'lodash';


/// classe base que ajuda a gerar o model do Delphi usando o mustache
export class JavaModel {
    imports: string;
    class: string; // armazena o nome da classe
    classCamel: string;
    fl: string; // first letter
    fields = []; // armazena os fields que são gerados
    properties = [];  // armazena as properties que são gerados na unit
    table: string; // armazena o nome da tabela
    fieldsObj = []; // armazena os objetos - relacionamentos OneToOne
    fieldsList = []; // armazena as listas - relacionamentos OneToMany 
    propertiesObj = []; // armazena as propertiy do tipo OneToOne
    propertiesList = []; // armazena as propertiy do tipo OneToMany

    relacionamentosDetalhe: Relacionamento[]; // armazena relacionamentos de uma tabela detalhe que serão encontrado aqui no Model


    constructor(tabela: string, dataPacket: CamposModel[], relacionamentos: Relacionamento[]) {
        // nome da classe
        this.table = tabela.toLowerCase();
        this.class = lodash.camelCase(tabela);
        this.class = lodash.upperFirst(this.class);
        this.classCamel = lodash.camelCase(tabela);
        this.fl = tabela.substring(0, 1);
        this.fl = this.fl.toLowerCase();
        this.imports = '';
        // arrays
        this.fields = [];
        this.properties = [];

        // fields e properties

        for (let i = 0; i < dataPacket.length; i++) {

            // define o nome do campo
            let nomeCampo = dataPacket[i].Field; //ID
            let nomeCampoUpper = nomeCampo.toUpperCase();
            let nomeCampoLower = nomeCampo.toLowerCase();

            let nomeCampoTabela = nomeCampo.toUpperCase();
            let nomeCampoJson = lodash.camelCase(nomeCampo);
            let nomeCampoFieldProperty = lodash.upperFirst(nomeCampoJson);

            let tipoDado = this.GetTipo(dataPacket[i].Type);

            let jpa = '@Column(name="' + nomeCampoUpper + '")\n\t';


            // se houver um campo PK e o Side for 'Local' adiciona o objeto da classe pai no relacionamento
            if (nomeCampoTabela.includes('ID_')) {
                if (dataPacket[i].Comment.includes('Local')) {
                    let tabela = nomeCampoTabela.replace('ID_', '');
                    let objeto = new Relacionamento({ tabela: tabela, opcoes: dataPacket[i].Comment });
                    if (this.relacionamentosDetalhe == null) {
                        this.relacionamentosDetalhe = new Array;
                    }
                    this.relacionamentosDetalhe.push(objeto); //se tiver algo local da classe pai
                } else if (dataPacket[i].Comment.includes('Inverse')) {
                    let tabela = nomeCampoTabela.replace('ID_', '');
                    tabela = lodash.camelCase(tabela);
                    let tipoObjeto = lodash.camelCase(tabela);
                    tipoObjeto = lodash.upperFirst(tipoObjeto);
                    let objeto = new Relacionamento({ tabela: tabela, opcoes: dataPacket[i].Comment });
                    let atributoNomeCampo = "";
                    this.imports = this.imports + 'import com.t2ti.fenixgerado.model.cadastros.' + tipoObjeto + ';\n';
                    if (objeto.Cardinalidade == '@OneToOne') {
                        atributoNomeCampo = '@JsonIgnore\n' +
                            '\t@OneToOne\n' +
                            '\t@JoinColumn(name="' + nomeCampoUpper + '")\n';
                        let field = atributoNomeCampo + '\tprivate ' + tipoObjeto + ' ' + tabela + ';\n';
                        this.fields.push(field);

                        // define a property
                        let metodoGet = "public " + tipoObjeto + " " + "get" + tipoObjeto + "(){\n" +
                            "\t\treturn this." + tabela + ";\n\t}";

                        let metodoSet = "\tpublic void " + "set" + tipoObjeto + "(" + tipoObjeto + " " + tabela + "){\n\t\t" +
                            "this." + tabela + " = " + tabela + ";\n\t}";

                        let metodos = metodoGet + '\n\n' + metodoSet + '\n';
                        this.properties.push(metodos);

                    } else if (objeto.Cardinalidade == '@OneToMany') {
                        atributoNomeCampo = '@JsonIgnore\n' +
                            '\t@ManyToOne\n' +
                            '\t@JoinColumn(name="' + nomeCampoUpper + '")\n';

                        let field = atributoNomeCampo + '\tprivate ' + tipoObjeto + ' '  + tabela + ';\n';
                        this.fields.push(field);
                        
                        // define a property
                        let metodoGet = "\tpublic " + tipoObjeto + " " + "get" + tipoObjeto + "(){\n\t\t" +
                            "\t\treturn this." + tabela + ";\n\t}";

                        let metodoSet = "\tpublic void " + "set" + tipoObjeto + "(" + tipoObjeto + " " + tabela + "){\n\t\t" +
                            "this." + tabela + " = "  + tabela+ ";\n\t}";

                        let metodos = metodoGet + '\n\n' + metodoSet + '\n';
                        this.properties.push(metodos);
                    }  

                }
            } else {

                // define o field
                let atributoNomeCampo = "";
                if (nomeCampoUpper == 'ID') {
                    jpa = '';
                    atributoNomeCampo = "@Id\n" + "\t@GeneratedValue(strategy = GenerationType.IDENTITY)\n\t";
                }
                if (tipoDado == 'Date') {
                    this.imports = this.imports + 'import java.util.Date;\n'
                }

                let field = atributoNomeCampo + jpa + 'private ' + tipoDado + ' ' + nomeCampoJson + ';\n';
                this.fields.push(field);

                ////////////////////////////////////////////////////////

                // define a property
                let metodoGet = "public " + tipoDado + " " + "get" + nomeCampoFieldProperty + "(){\n\t\t" +
                    "return this." + nomeCampoJson + ";\n\t}";

                let metodoSet = "\tpublic void " + "set" + nomeCampoFieldProperty + "(" + tipoDado + " " + nomeCampoJson + "){\n\t\t" +
                    "this." + nomeCampoJson + " = " + nomeCampoJson + ";\n\t}";

                let metodos = metodoGet + '\n\n' + metodoSet + '\n';

                this.properties.push(metodos);

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

    tratarRelacionamentos(relacionamentos: Relacionamento[]) {
        for (let i = 0; i < relacionamentos.length; i++) {
            let nomeCampo = relacionamentos[i].Tabela;
            let nomeCampoJson = lodash.camelCase(nomeCampo);
            let nomeCampoFieldProperty = lodash.upperFirst(nomeCampoJson);


            // uses
            this.imports = this.imports + 'import com.t2ti.fenixgerado.model.cadastros.' + nomeCampoFieldProperty + ';\n';


            // verifica a cardinalidade para definir o nome do field
            if (relacionamentos[i].Cardinalidade == '@OneToOne') {

                // //bi-directional many-to-one association to PessoaFisica
                // @OneToOne(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
                // private PessoaFisica pessoaFisica;

                // define o field - objeto
                let field = '//bi-directional many-to-one association to ' + nomeCampoFieldProperty
                    + '\n@OneToOne(mappedBy="' + this.classCamel + '", cascade = CascadeType.ALL, orphanRemoval = true)\n'
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
                let propertyGet = 'public ' + nomeCampoFieldProperty + ' get' + nomeCampoFieldProperty + '() {\n\t\treturn this.' + nomeCampoJson + ';\n\t}\n';

                this.propertiesObj.push(propertyGet);
                // construtor
                let propertySet = 'public void ' + 'set' + nomeCampoFieldProperty
                    + '(' + nomeCampoFieldProperty + ' ' + nomeCampoJson + ')'
                    + ' {\n\t\tthis.' + nomeCampoJson + ' = ' + nomeCampoJson + ';\n\t}\n';

                this.propertiesObj.push(propertySet);
                // destrutor
                //let releaseField = '  FreeAndNil(F' + nomeCampoFieldProperty + ');';
                //this.destImplementation.push(releaseField);

            } else if (relacionamentos[i].Cardinalidade == '@OneToMany') {

                // //bi-directional many-to-one association to PessoaTelefone
                // @OneToMany(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
                // private Set<PessoaTelefone> listaPessoaTelefone;

                // define o field - objeto
                let field = '//bi-directional many-to-one association to ' + nomeCampoFieldProperty
                    + '\n@OneToMany(mappedBy="' + this.classCamel + '", cascade = CascadeType.ALL, orphanRemoval = true)\n'
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
                let propertyGet = 'public Set<' + nomeCampoFieldProperty + '> getLista' + nomeCampoFieldProperty + '() {\n\t\treturn this.lista' + nomeCampoFieldProperty + ';\n\t}\n';

                this.propertiesList.push(propertyGet);
                // construtor
                let propertySet = 'public void ' + 'setLista' + nomeCampoFieldProperty + '(Set<'
                    + nomeCampoFieldProperty + '> ' + 'lista' + nomeCampoFieldProperty + ')'
                    + ' {\n\t\tthis.lista' + nomeCampoFieldProperty + ' = lista' + nomeCampoFieldProperty + ';\n'
                    + '\t\tfor(' + nomeCampoFieldProperty + ' ' + nomeCampoJson + ' : this.lista' + nomeCampoFieldProperty + ') {\n\t\t\t'
                    + nomeCampoJson + '.set' + this.class + '(this);\n\t\t}\n'
                    + '\t}\n';

                this.propertiesList.push(propertySet);
            } else if (relacionamentos[i].Cardinalidade == '@ManyToOne') {

                //bi-directional many-to-one association to Pessoa
                // @JsonIgnore
                // @ManyToOne
                // @JoinColumn(name="ID_PESSOA")
                // private Pessoa pessoa;

                // define o field - objeto
                let field = '//bi-directional many-to-one association to ' + nomeCampoFieldProperty
                    + '\n\t@JsonIgnore\n\t@ManyToOne\n\t@JoinColumn(name="'+ 'ID_' + relacionamentos[i].Tabela + '")\n'
                    + '\tprivate ' + nomeCampoFieldProperty + ' ' + nomeCampoJson + ';\n';
                this.fieldsList.push(field);

                // public Pessoa getPessoa() {
                //     return this.pessoa;
                // }
            
                // public void setPessoa(Pessoa pessoa) {
                //     this.pessoa = pessoa;
                // }

                // define a property
                let propertyGet = 'public ' + nomeCampoFieldProperty + ' get' + nomeCampoFieldProperty + '() {\n\t\treturn this.' + nomeCampoJson + ';\n\t}\n';

                this.propertiesList.push(propertyGet);
                // construtor
                let propertySet = 'public void ' + 'set' + nomeCampoFieldProperty + '('
                    + nomeCampoFieldProperty + ' ' + nomeCampoJson + ')'
                    + ' {\n\t\tthis.' + nomeCampoJson + ' = ' + nomeCampoJson + ';\n'
                    + '\t}\n';

                this.propertiesList.push(propertySet);
            }
        }
    }

    // define o tipo de dado
    GetTipo(pType: any): string {
        if (pType.includes('int')) {
            return 'Integer';
        } else if (pType.includes('letchar')) {
            return 'String';
        } else if (pType.includes('decimal')) {
            return 'double';
        } else if (pType.includes('char')) {
            return 'String';
        } else if (pType.includes('date')) {
            return 'Date';
        }
    }
}

//module.exports = JavaModel;