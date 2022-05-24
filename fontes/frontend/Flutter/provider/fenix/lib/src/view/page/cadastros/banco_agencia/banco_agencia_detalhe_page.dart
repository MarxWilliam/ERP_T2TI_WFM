import 'package:fenix/src/view/shared/erro_page.dart';
import 'package:fenix/src/view/shared/view_util_lib.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fenix/src/model/cadastros/banco_agencia.dart';
import 'package:fenix/src/view/page/cadastros/banco_agencia/banco_agencia_persiste_page.dart';
import 'package:fenix/src/view_model/banco_agencia_view_model.dart';

class BancoAgenciaDetalhePage extends StatelessWidget {
  final BancoAgencia bancoAgencia;

  const BancoAgenciaDetalhePage({Key key, this.bancoAgencia}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var bancoAgenciaProvider = Provider.of<BancoAgenciaViewModel>(context);

    if (bancoAgenciaProvider.objetoJsonErro != null) {
      Navigator.of(context).pop();
      return Scaffold(
        appBar: AppBar(
          title: const Text('Banco Agência'),
          actions: <Widget>[],
        ),
        body: ErroPage(
          objetoJsonErro: Provider.of<BancoAgenciaViewModel>(context).objetoJsonErro, //ErrorPage
        ),
      );
    } else {
      return Theme(
          data: ThemeData(brightness: Brightness.light, primarySwatch: Colors.blue, platform: Theme.of(context).platform),
          child: Scaffold(
            appBar: AppBar(title: Text('Banco Agência'), actions: <Widget>[
              IconButton(
                  icon: const Icon(Icons.delete, color: Colors.white),
                  onPressed: () {
                    return ViewUtilLib.geraShowDialogBoxExclusao(context, () {
                      bancoAgenciaProvider.excluir(bancoAgencia.id);
                      Navigator.of(context).pop(); //fecha o alerta
                      Navigator.of(context).pop(); // fecha o banco Agencia detalhe
                    });
                  }),
              IconButton(
                  icon: const Icon(Icons.edit, color: Colors.white),
                  onPressed: () {
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (BuildContext context) => BancoAgenciaPersistePage(
                              bancoAgencia: bancoAgencia,
                              title: 'Banco Agência - Editando',
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
                        'Detalhes do Banco Agência',
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
                            title: Text(bancoAgencia.id?.toString() ?? ''),
                            subtitle: Text('Id'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(bancoAgencia.banco.nome?.toString() ?? ''),
                            subtitle: Text('Banco'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(bancoAgencia.numero?.toString() ?? ''),
                            subtitle: Text('Número'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(bancoAgencia.digito?.toString() ?? ''),
                            subtitle: Text('Dígito'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(bancoAgencia.nome?.toString() ?? ''),
                            subtitle: Text('Nome'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(bancoAgencia.telefone?.toString() ?? ''),
                            subtitle: Text('Telefone'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(bancoAgencia.contato?.toString() ?? ''),
                            subtitle: Text('Contato'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(bancoAgencia.observacao?.toString() ?? ''),
                            subtitle: Text('Observação'),
                          ),
                          ListTile(
                            leading: Icon(Icons.arrow_right, color: Colors.grey),
                            title: Text(bancoAgencia.gerente?.toString() ?? ''),
                            subtitle: Text('Gerente'),
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
