const capitalize = require('capitalize');

/// classe base que ajuda a gerar o model do Delphi usando o mustache
class JavaModel {
    constructor(tabela, dataPacket) {
        // nome da classe
        this.class = capitalize(tabela);
        this.classLower = tabela;
        this.fl = tabela.substring(0, 1);

        // arrays
        this.fields = [];
        this.properties = [];

        // fields e properties
        var i;
        for(i = 0; i < dataPacket.length; i++){
            // define o nome do campo
            var nomeCampo = dataPacket[i].Field; //ID
            var nomeCampoUpper = nomeCampo.toUpperCase();
            var nomeCampoLower = nomeCampo.toLowerCase();

            nomeCampo = capitalize(nomeCampoLower);

            // define o tipo de dado
            var tipoDado = dataPacket[i].Type;
            if(tipoDado.includes('int')) {
                tipoDado = 'Integer';
            } else if(tipoDado.includes('varchar')) {
                tipoDado = 'String';
            }

            // define o field
            var atributoNomeCampo = "";
            if(nomeCampoUpper == 'ID') {
                atributoNomeCampo = "@Id\n" + "\t@GeneratedValue(strategy = GenerationType.IDENTITY)\n\t";
            } 
            var field = atributoNomeCampo + 'private ' + tipoDado + ' ' + nomeCampoLower + ';';
            this.fields.push(field);

            // define a property
            var metodoGet = "public " + tipoDado + " " + "get" + capitalize(nomeCampoLower) + "(){\n\t\t" + 
            "return this." + nomeCampoLower + ";\n}";
            
            var metodoSet = "public " + tipoDado + " " + "set" + capitalize(nomeCampoLower) + "(" + tipoDado + " " + nomeCampoLower + "){\n\t\t" + 
            "this." + nomeCampoLower + " = " + nomeCampoLower + ";\n}";

            var metodos = metodoGet + '\n\n' + metodoSet;

            this.properties.push(metodos);
        }
    }
}

module.exports = JavaModel;