import 'dart:convert';

class Banco {
  int id;
  String codigo;
  String nome;
  String url;

  Banco({this.id, this.codigo, this.nome, this.url});

  static List<String> campos = <String>['id', 'codigo', 'nome', 'url'];
  static List<String> colunas = <String>['Id', 'Código', 'Nome', 'URL'];

  Banco.fromJson(Map<String, dynamic> jsonDados) {
    id = jsonDados['id'];
    codigo = jsonDados['codigo'];
    nome = jsonDados['nome'];
    url = jsonDados['url'];
  }

  Map<String, dynamic> get toJson {
    Map<String, dynamic> jsonDados = Map<String, dynamic>();
    jsonDados['id'] = this.id;
    jsonDados['codigo'] = this.codigo;
    jsonDados['nome'] = this.nome;
    jsonDados['url'] = this.url;
    return jsonDados;
  }
}

String bancoEncodeJson(Banco banco) {
  final jsonDados = banco.toJson;
  return json.encode(jsonDados);
}
