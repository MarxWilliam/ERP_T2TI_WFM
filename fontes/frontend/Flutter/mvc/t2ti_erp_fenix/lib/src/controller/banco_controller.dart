import 'package:flutter/material.dart';
import 'package:mvc_application/controller.dart';
import 'package:t2ti_erp_fenix/src/action/banco_action.dart';
import 'package:t2ti_erp_fenix/src/model/banco.dart';
import 'package:t2ti_erp_fenix/src/service/banco_service.dart';

class BancoController extends ControllerMVC {
  factory BancoController() {
    _this ??= BancoController._();
    return _this;
  }
  static BancoController _this;
  BancoController._() : super();

  static bool _ordenado;
  static const _SORT_KEY = 'sort_by_alpha';

  @override
  void initState() async {
    await init();
    _ordenado = await Prefs.getBoolF(_SORT_KEY, false);
    bancoListando.refresh();
  }

  @override
  void dispose() {
    disposed();
    super.dispose();
  }

  @override
  void onError(FlutterErrorDetails details) =>
      FlutterError.dumpErrorToConsole(details);

  static Future<bool> init() => BancoService.initState();

  static void disposed() => BancoService.dispose();

  static Future<List<Banco>> getListaBanco() async {
    //chama o serviço para pegar a lista de bancos do SQLite
    List<Banco> listaBanco = await BancoService.consultarLista();
    if (_ordenado) listaBanco.sort();
    return listaBanco;
  }

  static recarregar() {
    _this?.refresh();
  }

  static Future<List<Banco>> ordenar() async {
    _ordenado = !_ordenado;
    Prefs.getBoolF(_SORT_KEY, _ordenado);
    List<Banco> listaBanco = await getListaBanco();
    return listaBanco;
  }

  static Future<bool> excluir(Banco banco) async {
    return await bancoEditando.excluir(banco);
  }

  Banco child(int index) {
    Banco banco = bancoListando.items?.elementAt(index);
    bancoListando.init(banco);
    return banco;
  }

  static BancoListando get bancoListando => _listaBanco;
  static BancoListando _listaBanco = BancoListando();
  static BancoEditando get bancoEditando => _editBanco;
  static BancoEditando _editBanco = BancoEditando();
  static BancoPersistindo get bancoPersistindo => _persisteBanco;
  static BancoPersistindo _persisteBanco = BancoPersistindo();
}
