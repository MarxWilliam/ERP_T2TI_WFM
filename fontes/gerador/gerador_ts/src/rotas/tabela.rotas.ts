//import { Request, Response } from 'express';
import { TabelaController } from "../controller/tabela.controller";

export class TabelaRotas {
  
   private controller: TabelaController;
   
   constructor() {
       this.controller = new TabelaController();
   }

   public routes(app: any): void {
    //  app.route('/')
    //    .get((request: Request, response: Response) => { 
    //      response.status(200).send({message: "Rota padrão atingida com sucesso."});
    //    });
     
    app.route('/tabela').get(this.controller.consultarLista);

    app.route('/tabela/:nomeTabela').get(this.controller.consultarListaCampos);

    app.route('/:linguagem/:nomeTabela').get(this.controller.gerarFontes);
   }
}