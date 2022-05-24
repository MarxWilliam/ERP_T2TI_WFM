import * as express from  'express';
import { TabelaRotas } from './rotas/tabela.rotas';
import bodyParser = require('body-parser');

class App {
    public app: express.Application;
    public tabelaRotas: TabelaRotas;

    constructor() {
        // inicial o express
        this.app = express();

        // Faz o parser do content-type do request - tipo: application/json
        this.app.use(bodyParser.json());
        
        // Faz o parser do content-type do request - tipo: application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: true })); //extends: true - pode enviar objetos aninhados  
        
        //adiciona uma rota simples padrão
        this.app.get('/', (req, res) => {
            res.json({ menssagem: "Olá, você esta no Gerador de Código do T2Ti ERP Fenix!" });
        });

        //rotas
        this.tabelaRotas = new TabelaRotas();
        this.tabelaRotas.routes(this.app);
    }
}

export default new App().app;

  

// //adiciona uma rota simples padrão
// app.get('/', (req, res) => {
//     res.json({menssagem: "Olá, você esta no T2Ti ERP Fenix!"});
// });

// //rotas
// // require('./src/rotas/tabela_rotas.js')(app);

// //configura a porta e começa a "Ouvir" pelas requisições
// const PORT = process.env.PORT || 3000; //   usa a variável de ambiente PORT ou vai para a porta 3000

// app.listen(PORT, () => {
//     console.log("Servidor node T2Ti ERP Fenix ouvindo na porta: " + PORT);
// });
// }