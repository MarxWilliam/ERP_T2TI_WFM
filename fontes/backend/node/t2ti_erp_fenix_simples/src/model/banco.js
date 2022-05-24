const conexao = require('../config/db_config.js');
//const { response } = require('express');

const Banco = function(banco) {
    this.codigo = banco.codigo;
    this.nome = banco.nome;
    this.url = banco.url;
};

Banco.ConsultarLista = result => {
    conexao.query('SELECT * FROM banco', (erro, res) => {
        if (erro) {
            console.log('erro: ', erro);
            result(null, erro);
            return;
        }
        console.log('L ista Objetos', res);
        result(null, res);
    });
};

Banco.ConsultarObjeto = (Id, result) => {
    conexao.query('SELECT * FROM banco WHERE id = ' + Id, (erro, res) => {
        if (erro) {
            console.log('erro: ', erro);
            result(null, erro);
            return;
        }
        if (res.length) { // > 0 não vi
            console.log('Objeto Localizado', res[0]);
            result(null, res[0]);
            return;
        }

        // objeto não localizado
        result(null, { kind: "not_found" });
    });
};

Banco.Inserir = (banco, result) => {
    conexao.query('INSERT INTO banco SET ?', banco, (erro, res) => {
        if (erro) {
            console.log('erro: ', erro);
            result(null, erro);
            return;
        }
        console.log('Objeto Inserido: ', {id: res.insertId, ...banco});
        result(null, {id: res.insertId, ...banco});
    });
};

Banco.Alterar = (Id, banco, result) => {
    conexao.query('UPDATE banco SET codigo = ?, nome = ?, url = ? WHERE id = ?', 
    [banco.codigo, banco.nome, banco.url, Id], 
    (erro, res) => {
        if (erro) {
            console.log('erro: ', erro);
            result(null, erro);
            return;
        }
    
        if (res.affectedRows == 0) {
            // objeto não localizado
            result(null, { kind: "not_found" });
            return;
        }


        console.log('Objeto Alterado: ', {id: Id, ...banco});
        result(null, {id: Id, ...banco});
    });
};

Banco.Excluir= (Id, result) => {
    conexao.query('DELETE FROM banco WHERE id = ' + Id, (erro, res) => {
        if (erro) {
            console.log('erro: ', erro);
            result(null, erro);
            return;
        }
        if (res.affectedRows == 0) {
            // objeto não localizado
            result(null, { kind: "not_found" });
            return;
        }

        console.log('Objeto excluido com id: ', Id);
        result(null, res);
    });
};

module.exports = Banco;