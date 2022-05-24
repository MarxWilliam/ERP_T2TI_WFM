import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mvc_application/mvc.dart';
import 'package:t2ti_erp_fenix/src/controller/banco_controller.dart';
import 'package:t2ti_erp_fenix/src/model/banco.dart';
import 'package:t2ti_erp_fenix/src/service/banco_service.dart';

class BancoPersistindo extends BancoEditando {
  @override
  void init([Object banco]) {
    super.init(banco);
  }

  void onPressed([BuildContext context]) {
    if (!_formKey.currentState.validate()) return;
    _formKey.currentState.save();
    _inForm = false;
    persistir();
    refresh();
  }
}

class BancoEditando extends BancoListando {
  bool _inForm = false;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  GlobalKey<FormState> get formKey {
    if (!_inForm) {
      _inForm = true;
    }
    return _formKey;
  }

  Future persistir([Banco banco]) {
    if (banco == null) {
      banco = _banco;
    }
    return BancoService.salvar(banco.toMap);
  }

  Future<bool> excluir([Banco banco]) async {
    if (banco == null) {
      banco = _banco;
    }
    return await BancoService.excluir(banco.toMap);
  }
}

class BancoListando extends BancoCampos {
  Banco _banco;
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();

  List<Banco> get items => _listaBanco;
  List<Banco> _listaBanco;

  Future<List<Banco>> refresh() async {
    _listaBanco = await BancoController.getListaBanco();
    BancoController.recarregar();
    return _listaBanco;
  }

  void sort() async {
    _listaBanco = await BancoController.ordenar();
    BancoController.recarregar();
  }

  void init([Object banco]) {
    if (banco == null) {
      _banco = Banco();
    } else {
      if (Banco is! Banco) return;
      _banco = (banco as Banco);
    }
    _id = Id(_banco);
    _codigo = Codigo(_banco);
    _nome = Nome(_banco);
    _url = Url(_banco);
  }
}

class BancoCampos {
  FieldWidgets<Banco> _id, _codigo, _nome, _url;

  Id get id => _id;
  set id(Id id) => _id = id;

  Codigo get codigo => _codigo;
  set codigo(Codigo codigo) => _codigo = codigo;

  Nome get nome => _nome;
  set nome(Nome nome) => _nome = nome;

  Url get url => _url;
  set url(Url url) => _url = url;
}
