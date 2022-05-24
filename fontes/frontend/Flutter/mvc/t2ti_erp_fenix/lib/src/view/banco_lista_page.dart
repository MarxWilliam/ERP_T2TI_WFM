import 'package:flutter/material.dart';
import 'package:mvc_application/mvc.dart';
import 'package:t2ti_erp_fenix/src/controller/banco_controller.dart';
import 'package:t2ti_erp_fenix/src/view/banco_detalhe_page.dart';

class BancoListaPage extends StatefulWidget {
  BancoListaPage({Key key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _BancoListaState();
}

class _BancoListaState extends StateMVC<BancoListaPage> {
  _BancoListaState() : super(BancoController()) {
    bancoController = controller;
  }
  BancoController bancoController;
  @override
  Widget build(BuildContext context) {
    ThemeData _theme = App.theme;
    return Theme(
      data: ThemeData(
        brightness: Brightness.light,
        primarySwatch: App.colorTheme,
        platform: Theme.of(context).platform,
      ),
      child: Scaffold(
        key: BancoController.bancoListando.scaffoldKey,
        appBar: AppBar(title: Text('Cadasto de Bancos'), actions: <Widget>[
          FlatButton(
              child: Icon(Icons.sort_by_alpha, color: Colors.white),
              onPressed: () {
                BancoController.bancoListando.sort();
              }),
        ]),
        //AppMenu.show(this);
        floatingActionButton: FloatingActionButton(
            child: Icon(Icons.add),
            onPressed: () {
              Navigator.of(context).pushNamed('/BancoAdd').then((_) {
                BancoController.bancoListando.refresh();
              });
            }),
        body: SafeArea(
          child: BancoController.bancoListando.items == null
              ? Center(child: CircularProgressIndicator())
              : ListView.builder(
                  itemCount: BancoController.bancoListando.items.length ?? 0,
                  itemBuilder: (BuildContext context, int index) {
                    Object bancoSelecionado = bancoController.child(index);
                    return BancoController.bancoListando.codigo.onDismissible(
                      child: Container(
                        decoration: BoxDecoration(
                            color: _theme.canvasColor,
                            border: Border(
                                bottom:
                                    BorderSide(color: _theme.dividerColor))),
                        child: ListTile(
                          onTap: () {
                            Navigator.of(context).push(MaterialPageRoute(
                                builder: (BuildContext context) =>
                                    BancoDetalhePage(banco: bancoSelecionado)));
                          },
                          leading:
                              BancoController.bancoListando.codigo.circleAvatar,
                          title: BancoController.bancoListando.nome.text,
                          subtitle: BancoController.bancoListando.url.text,
                          trailing:
                              BancoController.bancoListando.codigo.circleAvatar,
                        ),
                      ),
                      dismissed: (DismissDirection direction) {
                        BancoController.excluir(bancoSelecionado).then((_) {
                          BancoController.bancoListando.refresh();
                        });
                        BancoController.bancoListando.scaffoldKey.currentState
                            ?.showSnackBar(SnackBar(
                                duration: Duration(milliseconds: 8000),
                                content: Text('VOcê excluiu um item.'),
                                action: SnackBarAction(
                                  label: 'Desfazer',
                                  onPressed: () {
                                    //BancoController.undeleted(bancoSelecionado);
                                    BancoController.bancoListando.refresh();
                                  },
                                )));
                      },
                    );
                  },
                ),
        ),
      ),
    );
  }
}
