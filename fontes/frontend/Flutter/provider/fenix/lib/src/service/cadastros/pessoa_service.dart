import 'dart:convert';

import 'package:fenix/src/model/cadastros/pessoa.dart';
import 'package:fenix/src/model/filtro.dart';
import 'package:fenix/src/service/cadastros/service_base.dart';
import 'package:http/http.dart';

class PessoaService extends ServiceBase {
  var cliente = Client();
  //var url = 'http:localhost:8080/';

  //Classe responsável por requisições servidor REST4
  Future<List<Pessoa>> consultarLista({Filtro filtro}) async {
    var listaPessoa = List<Pessoa>();

    //faz tratamento do filtro
    tratarFiltro(filtro, '/pessoa');

    //pega a lista de objeto no servidor
    final response = await cliente.get(url);

    if (response.statusCode == 200) {
      //converte o response de JSON para List<dynamic>
      var responseConvertido = json.decode(response.body) as List<dynamic>;

      //loop da lista convertida para inserir os objetos Pessoa na lista de Pessoas
      for (var pessoaJson in responseConvertido) {
        listaPessoa.add(Pessoa.fromJson(pessoaJson));
      }

      return listaPessoa;
    } else {
      tratarRetorno(json.decode(response.body));
      return null;
    }
  }

  Future<Pessoa> consultarObjeto(int id) async {
    //pega o objeto no servidor pelo Id
    final response = await cliente.get('$endpoint/pessoa/$id');

    if (response.statusCode == 200) {
      //converte o response de JSON para objeto
      var pessoaJson = json.decode(response.body);
      //retorno o objeto convertido
      return Pessoa.fromJson(pessoaJson);
    } else {
      tratarRetorno(json.decode(response.body));
      return null;
    }
  }

  Future<Pessoa> inserir(Pessoa pessoa) async {
    final response = await cliente.post('$endpoint/pessoa', headers: {'content-type': 'application/json'}, body: pessoaEncodeJson(pessoa));

    if (response.statusCode == 200 || response.statusCode == 201) {
      //converte o response de JSON para objeto
      var pessoaJson = json.decode(response.body);
      //retorno o objeto convertido
      return Pessoa.fromJson(pessoaJson);
    } else {
      tratarRetorno(json.decode(response.body));
      return null;
    }
  }

  Future<Pessoa> alterar(Pessoa pessoa) async {
    var id = pessoa.id;
    final response = await cliente.put('$endpoint/pessoa/$id', headers: {'content-type': 'application/json'}, body: pessoaEncodeJson(pessoa));

    if (response.statusCode == 200) {
      //converte o response de JSON para objeto
      var pessoaJson = json.decode(response.body);
      //retorno o objeto convertido
      return Pessoa.fromJson(pessoaJson);
    } else {
      tratarRetorno(json.decode(response.body));
      return null;
    }
  }

  Future<bool> excluir(int id) async {
    final response = await cliente.delete(
      '$endpoint/pessoa/$id',
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
