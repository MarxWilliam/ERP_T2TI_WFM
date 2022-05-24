import 'package:fenix/src/model/filtro.dart';
import 'package:fenix/src/model/retorno_json_erro.dart';

/// Configurações base para os serviços REST
class ServiceBase {
  static const _porta = '8080';
  static const _enderecoServidor = 'http://10.0.1.104';
  static const _endpoint = _enderecoServidor + ':' + _porta;

  get endpoint => _endpoint;

  static var _url = '';
  get url => _url;

  static var _objetoJsonErro = RetornoJsonErro();
  get objetoJsonErro => _objetoJsonErro;

  void tratarFiltro(Filtro filtro, String entidade) {
    var stringFiltro = '';
    if (filtro != null) {
      stringFiltro = '?filter=' + filtro.campo + '||\$cont||'; // nome - codigo - url

      if (filtro.valor != '') {
        stringFiltro = stringFiltro + filtro.valor;
      } else {
        stringFiltro = stringFiltro; // + '/' + filtro.dataInicial + '/' + filtro.dataFinal;
      }
    }
    _url = _endpoint + entidade + stringFiltro;
  }

  void tratarRetorno(Map<String, dynamic> body) {
    _objetoJsonErro.status = body['status']?.toString() ?? body['statuscode'].toString();
    _objetoJsonErro.error = body['error'] ?? body['classname'].toString();
    _objetoJsonErro.message = body['message'];
    _objetoJsonErro.trace = body['trace'];
  }
}
