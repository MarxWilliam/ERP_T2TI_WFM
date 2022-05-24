module.exports = app => {

    const bancoController = require('../controller/banco_controller.js');

    // Consultar uma Lista de Objetos
    app.get('/banco', bancoController.ConsultarLista);

    // consultar lista de objetos com filtro
    app.get('/banco/:campo/:valor', bancoController.ConsultarListaFiltroValor);

    // consultar objeto
    app.get('/banco/:Id', bancoController.ConsultarObjeto);
    
    // Inserir um Objeto
    app.post('/banco', bancoController.Inserir);
    
    // Alterar um Objeto
    app.put('/banco', bancoController.Alterar);
    
    // Deletar um Objeto
    app.delete('/banco/:Id', bancoController.Excluir);
};