import 'package:fenix/src/view/page/cadastros/pessoa/pessoa_page.dart';
import 'package:fenix/src/view/shared/erro_page.dart';
import 'package:fenix/src/view/shared/view_util_lib.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fenix/src/model/cadastros/pessoa.dart';
import 'package:fenix/src/view_model/pessoa_view_model.dart';

class PessoaDetalhePage extends StatelessWidget {
  final Pessoa pessoa;

  const PessoaDetalhePage({Key key, this.pessoa}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var pessoaProvider = Provider.of<PessoaViewModel>(context);

    if (pessoaProvider.objetoJsonErro != null) {
      Navigator.of(context).pop();
      return Scaffold(
        appBar: AppBar(
          title: const Text('Pessoa'),
          actions: <Widget>[],
        ),
        body: ErroPage(
          objetoJsonErro: Provider.of<PessoaViewModel>(context).objetoJsonErro, //ErrorPage
        ),
      );
    } else {
      return Theme(
          data: ThemeData(brightness: Brightness.light, primarySwatch: Colors.blue, platform: Theme.of(context).platform),
          child: Scaffold(
            appBar: AppBar(title: Text('Pessoa'), actions: <Widget>[
              IconButton(
                  icon: const Icon(Icons.delete, color: Colors.white),
                  onPressed: () {
                    return ViewUtilLib.geraShowDialogBoxExclusao(context, () {
                      pessoaProvider.excluir(pessoa.id);
                      Navigator.of(context).pop(); //fecha o alerta
                      Navigator.of(context).pop(); // fecha o banco Agencia detalhe
                    });
                  }),
              IconButton(
                  icon: const Icon(Icons.edit, color: Colors.white),
                  onPressed: () {
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (BuildContext context) => PessoaPage(
                              pessoa: pessoa,
                              title: 'Pessoa - Editando',
                              operacao: 'A',
                            )));
                  }),
            ]),
            body: SingleChildScrollView(
              child: Theme(
                data: ThemeData(fontFamily: 'Raleway'),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Text(
                        'Detalhes do Pessoa',
                        style: TextStyle(color: Colors.grey.shade700),
                      ),
                    ),
                    Card(
                      color: Colors.white,
                      elevation: 2.0,
                      child: Column(
                        children: <Widget>[
                          ListTile(
                            leading: Icon(Icons.vpn_key, color: Colors.blue),
                            title: Text(pessoa.id?.toString() ?? ''),
                            subtitle: Text('Id'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(pessoa.nome?.toString() ?? ''),
                            subtitle: Text('Nome'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(pessoa.tipo?.toString() ?? ''),
                            subtitle: Text('Tipo'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(pessoa.site?.toString() ?? ''),
                            subtitle: Text('Site'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(pessoa.email?.toString() ?? ''),
                            subtitle: Text('Email'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(pessoa.cliente?.toString() ?? ''),
                            subtitle: Text('Cliente'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(pessoa.fornecedor?.toString() ?? ''),
                            subtitle: Text('Forncecedor'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(pessoa.transportadora?.toString() ?? ''),
                            subtitle: Text('Transportadora'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(pessoa.colaborador?.toString() ?? ''),
                            subtitle: Text('Colaborador'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(pessoa.contador?.toString() ?? ''),
                            subtitle: Text('Contador'),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ));
    }
  }
}
