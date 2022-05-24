import 'package:flutter/material.dart';
import 'package:mvc_application/view.dart';
import 'package:t2ti_erp_fenix/src/controller/banco_controller.dart';
import 'package:t2ti_erp_fenix/src/view/banco_persiste_page.dart';

class BancoDetalhePage extends StatelessWidget {
  BancoDetalhePage({this.banco, Key key}) : super(key: key) {
    BancoController.bancoListando.init(banco);
  }

  final Object banco;

  @override
  Widget build(BuildContext context) {
    return Theme(
        data: ThemeData(
            brightness: Brightness.light,
            primarySwatch: App.colorTheme,
            platform: Theme.of(context).platform),
        child: Scaffold(
          appBar:
              AppBar(title: BancoController.bancoEditando.nome.text, actions: [
            FlatButton(
                child: Icon(Icons.delete, color: Colors.white),
                onPressed: () {
                  showBox(text: 'Excluir esse banco', context: context)
                      .then((bool delete) {
                    if (delete)
                      BancoController.excluir(banco).then((bool delete) {
                        if (delete) BancoController.bancoListando.refresh();
                        Navigator.of(context).pop();
                      });
                  });
                }),
          ]),
          bottomNavigationBar: SimpleBottomAppBar(
            button01: HomeBarButton(onPressed: () {
              Navigator.of(context).pop();
            }),
            button02: SearchBarButton(),
            button03: EditBarButton(onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(
                  builder: (BuildContext context) =>
                      BancoPersistePage(banco: banco, title: 'EditarBanco')));
            }),
          ),
          body: CustomScrollView(slivers: <Widget>[
            SliverList(
              delegate: SliverChildListDelegate(<Widget>[
                BancoController.bancoEditando.nome.onListTile(tap: () {
                  editBanco(banco, context);
                }),
                BancoController.bancoEditando.url.onListTile(tap: () {
                  editBanco(banco, context);
                }),
              ]),
            ),
          ]),
        ));
  }

  editBanco(Object banco, BuildContext context) {
    Navigator.of(context).push(MaterialPageRoute(
        builder: (BuildContext context) =>
            BancoPersistePage(banco: banco, title: 'Editar um banco')));
  }
}
