module.exports = app => {

    const pessoaController = require('../controller/pessoa_controller.js');

    // Consultar uma Lista de Objetos
    app.get('/pessoa', pessoaController.ConsultarLista);

    // consultar objeto
    app.get('/pessoa/:Id', pessoaController.ConsultarObjeto);
    
    // Inserir um Objeto
    app.post('/pessoa', pessoaController.Inserir);
    
    // Alterar um Objeto
    app.put('/pessoa/:Id', pessoaController.Alterar);
    
    // Deletar um Objeto
    app.delete('/pessoa/:Id', pessoaController.Excluir);
};