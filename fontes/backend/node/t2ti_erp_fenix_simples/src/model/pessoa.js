const conexao = require('../config/db_config.js');
//const { response } = require('express');

const Pessoa = function (pessoa) {
    this.nome = pessoa.nome;
    this.tipo = pessoa.tipo;
    this.site = pessoa.site;
    this.email = pessoa.email;
    this.cliente = pessoa.cliente;
    this.fornecedor = pessoa.fornecedor;
    this.colaborador = pessoa.colaborador;
    this.transportadora = pessoa.transportadora;
    this.contador = pessoa.contador;
};

Pessoa.ConsultarLista = result => {
    conexao.query('SELECT * FROM pessoa', (erro, res) => {
        if (erro) {
            console.log('erro: ', erro);
            result(null, erro);
            return;
        }
        console.log('L ista Objetos', res);
        result(null, res);
    });
};

Pessoa.ConsultarObjeto = (Id, result) => {
    conexao.query('SELECT * FROM pessoa WHERE id = ' + Id, (erro, res) => {
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

Pessoa.Inserir = (pessoa, result) => {
    conexao.query('INSERT INTO pessoa SET ?', pessoa, (erro, res) => {
        if (erro) {
            console.log('erro: ', erro);
            result(null, erro);
            return;
        }
        console.log('Objeto Inserido: ', { id: res.insertId, ...pessoa });
        result(null, { id: res.insertId, ...pessoa });
    });
};

Pessoa.Alterar = (Id, pessoa, result) => {
    conexao.query('UPDATE pessoa SET     nome = ?, tipo = ?, site = ?, email = ?, cliente = ?,'
        + 'fornecedor = ?, colaborador = ?, transportadora = ?,'
        + 'contador = ? WHERE id = ?',
        [pessoa.nome,
        pessoa.tipo,
        pessoa.site,
        pessoa.email,
        pessoa.cliente,
        pessoa.fornecedor,
        pessoa.colaborador,
        pessoa.transportadora,
        pessoa.contador,
            Id], (erro, res) => {
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


                console.log('Objeto Alterado: ', { id: Id, ...pessoa });
                result(null, { id: Id, ...pessoa });
            });
};

Pessoa.Excluir = (Id, result) => {
    conexao.query('DELETE FROM pessoa WHERE id = ' + Id, (erro, res) => {
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

Pessoa.InserirPessoaJuridica = (pessoaJuridica, result) => {
    conexao.query('INSERT INTO pessoa_juridica SET ?', pessoaJuridica, (erro, res) => {
        if (erro) {
            console.log('erro: ', erro);
            result(null, erro);
            return;
        }
        console.log('Objeto Inserido: ', { id: res.insertId, ...pessoaJuridica });
        //result(null, {id: res.insertId, ...pessoaJuridica}); // Não tem esse retorno por que está no meio de uma inserção 
    });
};


Pessoa.InserirPessoaContato = (pessoaContato, result) => {
    conexao.query('INSERT INTO pessoa_contato SET ?', pessoaContato, (erro, res) => {
        if (erro) {
            console.log('erro: ', erro);
            result(null, erro);
            return;
        }
        console.log('Objeto Inserido: ', { id: res.insertId, ...pessoaContato });
        //result(null, {id: res.insertId, ...pessoaJuridica}); // Não tem esse retorno por que está no meio de uma inserção 
    });
};

module.exports = Pessoa;