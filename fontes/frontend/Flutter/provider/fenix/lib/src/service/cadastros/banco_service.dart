import 'dart:convert';

import 'package:fenix/src/model/filtro.dart';
import 'package:fenix/src/service/cadastros/service_base.dart';
import 'package:http/http.dart' show Client;
import 'package:fenix/src/model/cadastros/banco.dart';

class BancoService extends ServiceBase {
  var cliente = Client();
  //var url = 'http:localhost:8080/';

  //Classe responsável por requisições servidor REST4
  Future<List<Banco>> consultarLista({Filtro filtro}) async {
    var listaBanco = List<Banco>();

    //faz tratamento do filtro
    tratarFiltro(filtro, '/banco');

    //pega a lista de objeto no servidor
    final response = await cliente.get(url);

    if (response.statusCode == 200) {
      //converte o response de JSON para List<dynamic>
      var responseConvertido = json.decode(response.body) as List<dynamic>;

      //loop da lista convertida para inserir os objetos Banco na lista de Bancos
      for (var bancoJson in responseConvertido) {
        listaBanco.add(Banco.fromJson(bancoJson));
      }

      return listaBanco;
    } else {
      tratarRetorno(json.decode(response.body));
      return null;
    }
  }

  Future<Banco> consultarObjeto(int id) async {
    //pega o objeto no servidor pelo Id
    final response = await cliente.get('$endpoint/banco/$id');

    if (response.statusCode == 200) {
      //converte o response de JSON para objeto
      var bancoJson = json.decode(response.body);
      //retorno o objeto convertido
      return Banco.fromJson(bancoJson);
    } else {
      tratarRetorno(json.decode(response.body));
      return null;
    }
  }

  Future<Banco> inserir(Banco banco) async {
    final response = await cliente.post('$endpoint/banco', headers: {'content-type': 'application/json'}, body: bancoEncodeJson(banco));

    if (response.statusCode == 200 || response.statusCode == 201) {
      //converte o response de JSON para objeto
      var bancoJson = json.decode(response.body);
      //retorno o objeto convertido
      return Banco.fromJson(bancoJson);
    } else {
      tratarRetorno(json.decode(response.body));
      return null;
    }
  }

  Future<Banco> alterar(Banco banco) async {
    var id = banco.id;
    final response = await cliente.put('$endpoint/banco/$id', headers: {'content-type': 'application/json'}, body: bancoEncodeJson(banco));

    if (response.statusCode == 200) {
      //converte o response de JSON para objeto
      var bancoJson = json.decode(response.body);
      //retorno o objeto convertido
      return Banco.fromJson(bancoJson);
    } else {
      tratarRetorno(json.decode(response.body));
      return null;
    }
  }

  Future<bool> excluir(int id) async {
    final response = await cliente.delete(
      '$endpoint/banco/$id',
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
