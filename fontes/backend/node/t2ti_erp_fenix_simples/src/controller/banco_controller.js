const Banco = require('../model/banco.js');

// consultar a lista
exports.ConsultarLista = (req, res) => {
    Banco.ConsultarLista((erro, dados) => {
        if(erro){
            res.status(500).send({
                mensagem: "Ocorreu um erro na consulta (Banco) - " + erro.message
            });
        } else res.send(dados);
    });
};

// consultar a lista
exports.ConsultarObjeto = (req, res) => {
    Banco.ConsultarObjeto(req.params.Id, (erro, dados) => {
        if(erro){
            if(erro.kind === 'not_found') {
                res.status(404).send({
                    mensagem: "Banco não localizado para o id: " + req.params.Id 
                });                
            } else {
                res.status(500).send({
                    mensagem: "Erro ao consultar Banco com Id: " + req.params.Id
                });
            }
        } else res.send(dados);
    });
};

// inserrir objeto
exports.Inserir = (req, res) => {
    // valida o conteúdo da requisição
    if(!req.body){
        res.status(404).send({
            mensagem: "Conteúdo não pode ser vazio." 
        });
    }

    //instanciar objeto a partir do JSON vindo na requisição 
    var banco = new Banco(req.body);

    // salvar objeto no banco de dados
    Banco.Inserir(banco, (erro, dados) => {
        if(erro){
                res.status(500).send({
                    mensagem: "Erro ao inserir Banco - " + erro.message
                });
        } else res.send(dados);
    });
};

// alterar objeto
exports.Alterar = (req, res) => {
    // valida o conteúdo da requisição
    if(!req.body){
        res.status(400).send({
            mensagem: "Conteúdo não pode ser vazio." 
        });
    }

    //instanciar objeto a partir do JSON vindo na requisição
    var banco = new Banco(req.body);

    // salvar objeto no banco de dados
    Banco.Alterar(req.params.Id, banco, (erro, dados) => {
        if(erro){
            if(erro.kind === 'not_found') {
                res.status(404).send({
                    mensagem: "Banco não localizado para o id: " + req.params.Id 
                });                
            } else {
                res.status(500).send({
                    mensagem: "Erro ao alterar Banco com Id: " + req.params.Id
                });
            }
        } else res.send(dados);
    });
};

// Excluir objeto
exports.Excluir = (req, res) => {
    Banco.Excluir(req.params.Id, (erro, dados) => {
        if(erro){
            if(erro.kind === 'not_found') {
                res.status(404).send({
                    mensagem: "Banco não localizado para o id: " + req.params.Id 
                });                
            } else {
                res.status(500).send({
                    mensagem: "Erro ao excluir Banco com Id: " + req.params.Id
                });
            }
        } else
            res.send({
            mensagem: "Registro excluido com sucesso."
        });
    });
};