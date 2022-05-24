import * as capitalize from 'capitalize';
import { CamposModel } from '../../model/campos.model';

/// classe base que ajuda a gerar o model do Delphi usando o mustache
export class NodeModel {
    class: string;
    classLower: string;
    fl: string;
    fields = [];
    
    constructor(tabela: string, dataPacket: CamposModel[]) {
        // nome da classe
        this.class = capitalize(tabela);
        this.classLower = tabela;
        this.fl = tabela.substring(0, 1);

        // // arrays
        // this.fields = [];
        // //this.properties = [];

        // fields e properties
        
        for (let i = 0; i < dataPacket.length; i++) {
            // define o nome do campo
            let nomeCampo = dataPacket[i].Field; //ID
            let nomeCampoUpper = nomeCampo.toUpperCase();
            let nomeCampoLower = nomeCampo.toLowerCase();

            nomeCampo = capitalize(nomeCampoLower);

            let tipoDado = this.GetTipo(dataPacket[i].Type);
       

            // define o field
            let field = "";
            if (nomeCampoUpper == 'ID') {
                field = "id: {\n\t\tprimaryKey: true,\n\t\tautoIncrement: true,\n\t\ttype: Sequelize." + tipoDado.toUpperCase() + ",\n\t\tfield: '" + nomeCampo.toUpperCase() + "'\n\t}";
            } else {
                let field = nomeCampo + ": {\n\t\ttype: Sequelize." + tipoDado.toUpperCase() + ",\n\t\tfield: '" + nomeCampo.toUpperCase() + "'\n\t}";
            }
            if (i<dataPacket.length-1) { 
                field = field + ",\n";
            }
            this.fields.push(field);
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
            return 'DateTime';   
        }     
    }
}

//module.exports = NodeModel;