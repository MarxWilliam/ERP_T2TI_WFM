import 'dart:convert';

class PessoaContato {
  int id;
  int idPessoa;
  String nome;
  String email;
  String observacao;

  PessoaContato({this.id, this.idPessoa, this.nome, this.email, this.observacao});

  static List<String> campos = <String>['id', 'nome', 'email', 'observacao'];
  static List<String> colunas = <String>['Id', 'Nome', 'Email', 'Observação'];

  PessoaContato.fromJson(Map<String, dynamic> jsonDados) {
    id = jsonDados['id'];
    idPessoa = jsonDados['idPessoa'];
    nome = jsonDados['nome'];
    email = jsonDados['email'];
    observacao = jsonDados['observacao'];
  }

  Map<String, dynamic> get toJson {
    Map<String, dynamic> jsonDados = Map<String, dynamic>();
    jsonDados['id'] = this.id ?? 0;
    jsonDados['idPessoa'] = this.idPessoa ?? 0;
    jsonDados['nome'] = this.nome;
    jsonDados['email'] = this.email;
    jsonDados['observacao'] = this.observacao;
    return jsonDados;
  }
}

String pessoaContatoEncodeJson(PessoaContato pessoaContato) {
  final jsonDados = pessoaContato.toJson;
  return json.encode(jsonDados);
}
