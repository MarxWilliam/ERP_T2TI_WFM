import 'dart:convert';

import 'package:fenix/src/model/cadastros/banco_agencia.dart';
import 'package:fenix/src/model/filtro.dart';
import 'package:fenix/src/service/cadastros/service_base.dart';
import 'package:http/http.dart';

class BancoAgenciaService extends ServiceBase {
  var cliente = Client();
  //var url = 'http:localhost:8080/';

  //Classe responsável por requisições servidor REST4
  Future<List<BancoAgencia>> consultarLista({Filtro filtro}) async {
    var listaBancoAgencia = List<BancoAgencia>();

    //faz tratamento do filtro
    tratarFiltro(filtro, '/banco-agencia');

    //pega a lista de objeto no servidor
    final response = await cliente.get(url);

    if (response.statusCode == 200) {
      //converte o response de JSON para List<dynamic>
      var responseConvertido = json.decode(response.body) as List<dynamic>;

      //loop da lista convertida para inserir os objetos BancoAgencia na lista de BancoAgencias
      for (var bancoAgenciaJson in responseConvertido) {
        listaBancoAgencia.add(BancoAgencia.fromJson(bancoAgenciaJson));
      }

      return listaBancoAgencia;
    } else {
      tratarRetorno(json.decode(response.body));
      return null;
    }
  }

  Future<BancoAgencia> consultarObjeto(int id) async {
    //pega o objeto no servidor pelo Id
    final response = await cliente.get('$endpoint/banco-agencia/$id');

    if (response.statusCode == 200) {
      //converte o response de JSON para objeto
      var bancoAgenciaJson = json.decode(response.body);
      //retorno o objeto convertido
      return BancoAgencia.fromJson(bancoAgenciaJson);
    } else {
      tratarRetorno(json.decode(response.body));
      return null;
    }
  }

  Future<BancoAgencia> inserir(BancoAgencia bancoAgencia) async {
    final response = await cliente.post('$endpoint/banco-agencia',
        headers: {'content-type': 'application/json'}, body: bancoAgenciaEncodeJson(bancoAgencia));

    if (response.statusCode == 200 || response.statusCode == 201) {
      //converte o response de JSON para objeto
      var bancoAgenciaJson = json.decode(response.body);
      //retorno o objeto convertido
      return BancoAgencia.fromJson(bancoAgenciaJson);
    } else {
      tratarRetorno(json.decode(response.body));
      return null;
    }
  }

  Future<BancoAgencia> alterar(BancoAgencia bancoAgencia) async {
    var id = bancoAgencia.id;
    final response = await cliente.put('$endpoint/banco-agencia/$id',
        headers: {'content-type': 'application/json'}, body: bancoAgenciaEncodeJson(bancoAgencia));

    if (response.statusCode == 200) {
      //converte o response de JSON para objeto
      var bancoAgenciaJson = json.decode(response.body);
      //retorno o objeto convertido
      return BancoAgencia.fromJson(bancoAgenciaJson);
    } else {
      tratarRetorno(json.decode(response.body));
      return null;
    }
  }

  Future<bool> excluir(int id) async {
    final response = await cliente.delete(
      '$endpoint/banco-agencia/$id',
      headers: {'content-type': 'application/json'},
    );
    if (response.statusCode == 200) {
      return true;
    } else {
      tratarRetorno(json.decode(response.body));
      return false;
    }
  }
}
