import { connection } from '../config/db.config';

export class TabelaService {

    constructor() { }

    static async consultarLista(result: (lista: any, erro: any) => void ) {
        try{
            let sql = "SELECT table_name AS nome " +
                "FROM " +
                "information_schema.tables " +
                "WHERE " +
                "table_schema = DATABASE()";
            let dados = await(await connection).manager.query(sql);
            return result(dados, null);
        } catch(erro){
            return result(null, erro);
        }
        // connection
        //     .then(async connection => {
        //         let sql = "SELECT table_name AS nome " +
        //             "FROM " +
        //             "information_schema.tables " +
        //             "WHERE " +
        //             "table_schema = DATABASE()";
        //         let dados = await connection.manager.query(sql);
        //         result(dados, null);
        //     }).catch(error => {
        //         result(null, error);
        //     });
    }

    static async consultarListaCampos(tabela: string, result: (lista: any, erro: any) => void ) {
        try { 
            let sql = "SHOW FULL COLUMNS FROM " + tabela;
            let dados = await (await connection).manager.query(sql);
            return result(dados, null);
        } catch(erro){
            return result(null, erro);
        }
        // connection
        //     .then(async connection => {
        //         let sql ="SHOW FULL COLUMNS FROM " + tabela;
        //         let dados = await connection.manager.query(sql);
        //         result(dados, null);
        //         return dados;
        //     }).catch(error => {
        //         result(null, error);
        //     });
    }

    static async consultarAgregados(tabela: string) { 
        try {
            let sql = "SELECT TABLE_NAME, COLUMN_NAME " +
                "FROM information_schema.columns " +
                "WHERE table_schema = 'fenix' and COLUMN_NAME = 'ID_" + tabela + "'";
            let dados = await (await connection).manager.query(sql);
            return dados;
        } catch (erro) { 
            return erro;
        }
    }

    static async    pegarCampos(tabela: string){
        try { 
            let sql = "SHOW FULL COLUMNS FROM " + tabela;
            let dados = await (await connection).manager.query(sql);
            return dados;
        } catch(erro){
            return erro;
        }
    }
}