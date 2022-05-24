const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//// testes com o Mustache - begin
const Mustache = require('mustache');
const fs = require('fs');
const capitalize = require('capitalize');
const TabelaService = require(__dirname + '/src/service/tabela_service.js');
//const DelphiModel = require(__dirname + '/src/model/delphi_model.js');
const JavaModel = require(__dirname + '/src/model/java_model.js');
const RetonoJsonErro = require(__dirname + '/src/model/retorno_json_erro.js');

function loadTemplate(template) {
    return fs.readFileSync(__dirname + '/src/fontes/java/' + template).toString();
}

app.get('/:linguagem/:nomeTabela', (req, res) => {
    var linguagem = req.params.linguagem;
    var tabela = req.params.nomeTabela;

    TabelaService.ConsultarListaCampos(tabela, (dataPacket, erro) => {
        if(erro != null){
            var jsonErro = new RetornoJsonErro({codigo:500, mensagem: "Erro no servidor [Consultar Lista Campos]", erro: erro});
            res.status(500).send(jsonErro);
        } else {
            var modelJson = new JavaModel(tabela, dataPacket);
            
            fs.mkdir(__dirname + '/src/fontes/' + linguagem + '/' + tabela, {recursive: true}, (err) => {
                if(err) throw err;
            });

            var modelTemplate = loadTemplate('Java.Model.mustache');
            var modelGerado = Mustache.render(modelTemplate, modelJson);
    
            fs.writeFileSync(__dirname + '/src/fontes/' + linguagem + '/' + tabela + '/' + capitalize(tabela) + "" + '.java', modelGerado, function(err){
                if(err){
                    return console.log(err);
                }
                console.log('Arquivo criado com sucesso!');
            });
            
            res.json({menssagem: "Arquivo criado com sucesso!"});
        }
    });
});

// app.get('/:linguagem/:nomeTabela', (req, res) => {
//     var linguagem = req.params.linguagem;
//     var tabela = req.params.nomeTabela;

//     TabelaService.ConsultarListaCampos(tabela, (dataPacket, erro) => {
//         if(erro != null){
//             var jsonErro = new RetornoJsonErro({codigo:500, mensagem: "Erro no servidor [Consultar Lista Campos]", erro: erro});
//             res.status(500).send(jsonErro);
//         } else {
//             var modelJson = new JavaModel(tabela, dataPacket);
            
//             fs.mkdir(__dirname + '/src/fontes/' + linguagem + '/' + tabela, {recursive: true}, (err) => {
//                 if(err) throw err;
//             });

//             var modelTemplate = loadTemplate('Java.Model.mustache');
//             var modelGerado = Mustache.render(modelTemplate, modelJson);
    
//             fs.writeFileSync(__dirname + '/src/fontes/' + linguagem + '/' + tabela + '/' + capitalize(tabela) + '.java', modelGerado, function(err){
//                 if(err){
//                     return console.log(err);
//                 }
//                 console.log('Arquivo criado com sucesso!');
//             });
            
//             res.json({menssagem: "Arquivo criado com sucesso!"});
//         }
//     });
// });


//// testes com o Mustache - end


// Faz o parser do content-type do request - tipo: application/json
app.use(bodyParser.json());

// Faz o parser do content-type do request - tipo: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true})); //extends: true - pode enviar objetos aninhados    

//adiciona uma rota simples padrão
app.get('/', (req, res) => {
    res.json({menssagem: "Olá, você esta no T2Ti ERP Fenix!"});
});

//rotas
// require('./src/rotas/tabela_rotas.js')(app);

//configura a porta e começa a "Ouvir" pelas requisições
const PORT = process.env.PORT || 3000; //   usa a variável de ambiente PORT ou vai para a porta 3000

app.listen(PORT, () => {
    console.log("Servidor node T2Ti ERP Fenix ouvindo na porta: " + PORT);
});