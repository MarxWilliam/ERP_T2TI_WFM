import 'dart:convert';

import 'package:fenix/src/model/cadastros/banco.dart';

class BancoAgencia {
  int id;
  int idBanco;
  String numero;
  String digito;
  String nome;
  String telefone;
  String contato;
  String observacao;
  String gerente;
  Banco banco;

  BancoAgencia(
      {this.id, this.idBanco, this.numero, this.digito, this.nome, this.telefone, this.contato, this.observacao, this.gerente, this.banco});

  static List<String> campos = <String>['id', 'id_banco', 'numero', 'digito', 'nome', 'telefone', 'contato', 'observacao', 'gerente'];
  static List<String> colunas = <String>['id', 'Id Banco', 'Número', 'Dígito', 'Nome', 'Telefone', 'Contato', 'Observação', 'Gerente'];

  BancoAgencia.fromJson(Map<String, dynamic> jsonDados) {
    id = jsonDados['id'];
    idBanco = jsonDados['idBanco'];
    numero = jsonDados['numero'];
    digito = jsonDados['digito'];
    nome = jsonDados['nome'];
    telefone = jsonDados['telefone'];
    contato = jsonDados['contato'];
    observacao = jsonDados['observacao'];
    gerente = jsonDados['gerente'];
    banco = new Banco.fromJson(jsonDados['banco']);
  }

  Map<String, dynamic> get toJson {
    Map<String, dynamic> jsonDados = Map<String, dynamic>();
    jsonDados['id'] = this.id;
    jsonDados['idBanco'] = this.idBanco;
    jsonDados['numero'] = this.numero;
    jsonDados['digito'] = this.digito;
    jsonDados['nome'] = this.nome;
    jsonDados['telefone'] = this.telefone;
    jsonDados['contato'] = this.contato;
    jsonDados['observacao'] = this.observacao;
    jsonDados['gerente'] = this.gerente;
    jsonDados['banco'] = this.banco.toJson;
    return jsonDados;
  }
}

String bancoAgenciaEncodeJson(BancoAgencia bancoAgencia) {
  final jsonDados = bancoAgencia.toJson;
  return json.encode(jsonDados);
}
