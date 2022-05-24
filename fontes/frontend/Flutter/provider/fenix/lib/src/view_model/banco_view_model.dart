import 'package:fenix/src/infra/locator.dart';
import 'package:fenix/src/model/filtro.dart';
import 'package:fenix/src/model/retorno_json_erro.dart';
import 'package:flutter/material.dart';
import 'package:fenix/src/model/cadastros/banco.dart';
import 'package:fenix/src/service/cadastros/banco_service.dart';

class BancoViewModel extends ChangeNotifier {
  BancoService _bancoService = locator<BancoService>();
  var listaBanco = List<Banco>();
  RetornoJsonErro objetoJsonErro;

  BancoViewModel() {
    consultarLista();
  }

  Future<List<Banco>> consultarLista({Filtro filtro}) async {
    listaBanco = await _bancoService.consultarLista(filtro: filtro);
    if (listaBanco == null) {
      objetoJsonErro = _bancoService.objetoJsonErro;
    }
    notifyListeners();
    return listaBanco;
  }

  Future<Banco> consultarObjeto(int id) async {
    var result = await _bancoService.consultarObjeto(id);
    if (result == null) {
      objetoJsonErro = _bancoService.objetoJsonErro;
    }
    notifyListeners();
    return result;
  }

  Future<Banco> inserir(Banco banco) async {
    var result = await _bancoService.inserir(banco);
    if (result == null) {
      objetoJsonErro = _bancoService.objetoJsonErro;
    }
    notifyListeners();
    return result;
  }

  Future<Banco> alterar(Banco banco) async {
    var result = await _bancoService.alterar(banco);
    if (result == null) {
      objetoJsonErro = _bancoService.objetoJsonErro;
    }
    notifyListeners();
    return result;
  }

  Future<bool> excluir(int id) async {
    var result = await _bancoService.excluir(id);
    if (result == false) {
      objetoJsonErro = _bancoService.objetoJsonErro;
      notifyListeners();
    } else {
      consultarLista();
    }
    return result;
  }
}
