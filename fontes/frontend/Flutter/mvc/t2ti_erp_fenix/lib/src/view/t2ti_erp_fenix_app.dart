import 'package:flutter/material.dart';
import 'package:mvc_application/view.dart';
import 'package:t2ti_erp_fenix/src/view/banco_lista_page.dart';
import 'package:t2ti_erp_fenix/src/view/banco_persiste_page.dart';

class T2TiERPFenixApp extends AppView {
  T2TiERPFenixApp()
      : super(
          title: 'T2Ti ERP Fenix',
          routes: {
            '/BancoAdd': (BuildContext context) => BancoPersistePage()
          }, //Persiste serve tainto pra adiciona quanto pra editar
          home: BancoListaPage(),
          theme: ThemeData(
              primarySwatch: Colors.purple,
              accentColor: Colors.orangeAccent[400]),
        );
}
