const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Faz o parser do content-type do request - tipo: application/json
app.use(bodyParser.json());

// Faz o parser do content-type do request - tipo: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true})); //extends: true - pode enviar objetos aninhados    

//adiciona uma rota simples padrão
app.get('/', (req, res) => {
    res.json({menssagem: "Olá, você esta no T2Ti ERP Fenix!"});
});

//rotas
require('./src/rotas/banco_rotas.js')(app);
require('./src/rotas/pessoa_rotas.js')(app);

//configura a porta e começa a "Ouvir" pelas requisições
const PORT = process.env.PORT || 3000; //   usa a variável de ambiente PORT ou vai para a porta 3000

app.listen(PORT, () => {
    console.log("Servidor node T2Ti ERP Fenix ouvindo na porta: " + PORT);
});