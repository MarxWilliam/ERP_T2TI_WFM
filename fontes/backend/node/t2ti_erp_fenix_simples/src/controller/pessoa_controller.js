const Pessoa = require('../model/pessoa.js');

// consultar a lista
exports.ConsultarLista = (req, res) => {
    Pessoa.ConsultarLista((erro, dados) => {
        if (erro) {
            res.status(500).send({
                mensagem: "Ocorreu um erro na consulta (Pessoa) - " + erro.message
            });
        } else res.send(dados);
    });
};

// consultar a lista
exports.ConsultarObjeto = (req, res) => {
    Pessoa.ConsultarObjeto(req.params.Id, (erro, dados) => {
        if (dados.kind === 'not_found') {
            res.status(404).send({
                mensagem: "Registro não localizado para o id: " + req.params.Id
            });
        } else if (erro) {
            res.status(500).send({
                mensagem: "Erro ao consultar Pessoa com Id: " + req.params.Id
            });
        } else res.send(dados);
    });
};

// inserrir objeto
exports.Inserir = (req, res) => {
    // valida o conteúdo da requisição
    if (!req.body) {
        res.status(404).send({
            mensagem: "Conteúdo não pode ser vazio."
        });
    }

    //instanciar objeto a partir do JSON vindo na requisição 
    var pessoa = new Pessoa(req.body);

    // pegar pessoa jurídica do json
    var pessoaJuridica = req.body.PessoaJuridica;

    // pegar lista pessoa contato do json
    var listaContatos = req.body.ListaContatos;

    // salvar objeto no pessoa de dados
    Pessoa.Inserir(pessoa, (erro, dados) => {
        if (erro) {
            res.status(500).send({
                mensagem: "Erro ao inserir Pessoa - " + erro.message
            });
        } else {
            // inserir pessoa juridica
            pessoaJuridica.id_pessoa = dados.id;
            Pessoa.InserirPessoaJuridica(pessoaJuridica);

            // inserir pessoa contato
            for(var i = 0;i<listaContatos.length;i++){
                listaContatos[i].id_pessoa = dados.id;
                Pessoa.InserirPessoaContato(listaContatos[i]);
            }
            

            res.send(dados);
        }
    });
};

// alterar objeto
exports.Alterar = (req, res) => {
    // valida o conteúdo da requisição
    if (!req.body) {
        res.status(400).send({
            mensagem: "Conteúdo não pode ser vazio."
        });
    }

    //instanciar objeto a partir do JSON vindo na requisição
    var pessoa = new Pessoa(req.body);

    // salvar objeto no pessoa de dados
    Pessoa.Alterar(req.params.Id, pessoa, (erro, dados) => {
        if (erro) {
            if (erro.kind === 'not_found') {
                res.status(404).send({
                    mensagem: "Pessoa não localizado para o id: " + req.params.Id
                });
            } else {
                res.status(500).send({
                    mensagem: "Erro ao alterar Pessoa com Id: " + req.params.Id
                });
            }
        } else res.send(dados);
    });
};

// Excluir objeto
exports.Excluir = (req, res) => {
    Pessoa.Excluir(req.params.Id, (erro, dados) => {
        if (erro) {
            if (erro.kind === 'not_found') {
                res.status(404).send({
                    mensagem: "Pessoa não localizado para o id: " + req.params.Id
                });
            } else {
                res.status(500).send({
                    mensagem: "Erro ao excluir Pessoa com Id: " + req.params.Id
                });
            }
        } else
            res.send({
                mensagem: "Registro excluido com sucesso."
            });
    });
};