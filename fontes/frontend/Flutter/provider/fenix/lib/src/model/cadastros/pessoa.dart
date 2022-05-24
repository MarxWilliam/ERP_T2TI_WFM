import 'dart:convert';

import 'package:fenix/src/model/cadastros/pessoa_contato.dart';
import 'package:fenix/src/model/cadastros/pessoa_endereco.dart';
import 'package:fenix/src/model/cadastros/pessoa_fisica.dart';
import 'package:fenix/src/model/cadastros/pessoa_juridica.dart';
import 'package:fenix/src/model/cadastros/pessoa_telefone.dart';

class Pessoa {
  int id;
  String nome;
  String tipo;
  String site;
  String email;
  String cliente;
  String fornecedor;
  String transportadora;
  String colaborador;
  String contador;
  PessoaFisica pessoaFisica;
  PessoaJuridica pessoaJuridica;
  List<PessoaTelefone> listaPessoaTelefone = [];
  List<PessoaEndereco> listaPessoaEndereco = [];
  List<PessoaContato> listaPessoaContato = [];

  Pessoa(
      {this.id,
      this.nome,
      this.tipo = 'Física', //valor padrçao para o preenchimento do DropDownButton
      this.site,
      this.email,
      this.cliente,
      this.fornecedor,
      this.transportadora,
      this.colaborador,
      this.contador,
      this.pessoaFisica,
      this.pessoaJuridica,
      this.listaPessoaTelefone,
      this.listaPessoaEndereco,
      this.listaPessoaContato});

  static List<String> campos = <String>[
    'id',
    'nome',
    'tipo',
    'site',
    'email',
    'cliente',
    'fornecedor',
    'transportadora',
    'colaborador',
    'contador'
  ];
  static List<String> colunas = <String>[
    'Id',
    'Nome',
    'Tipo',
    'Site',
    'Email',
    'Cliente',
    'Fornecedor',
    'Transportadora',
    'Colaborador',
    'Contador'
  ];

  Pessoa.fromJson(Map<String, dynamic> jsonDados) {
    id = jsonDados['id'];
    nome = jsonDados['nome'];
    tipo = (jsonDados['tipo'] ?? 'F') == 'F' ? 'Física' : 'Jurídica'; //DropDownButton  // Domains
    site = jsonDados['site'];
    email = jsonDados['email'];
    cliente = jsonDados['cliente'] == 'S' ? 'Sim' : 'Não'; //DropDownButton
    fornecedor = jsonDados['fornecedor'] == 'S' ? 'Sim' : 'Não'; //DropDownButton
    transportadora = jsonDados['transportadora'] == 'S' ? 'Sim' : 'Não'; //DropDownButton
    colaborador = jsonDados['colaborador'] == 'S' ? 'Sim' : 'Não'; //DropDownButton
    contador = jsonDados['contador'] == 'S' ? 'Sim' : 'Não'; //DropDownButton
    pessoaFisica = jsonDados['pessoaFisica'] == null ? null : new PessoaFisica.fromJson(jsonDados['pessoaFisica']);
    pessoaJuridica = jsonDados['pessoaJuridica'] == null ? null : new PessoaJuridica.fromJson(jsonDados['pessoaJuridica']);
    listaPessoaTelefone = (jsonDados['listaPessoaTelefone'] as Iterable)?.map((m) => PessoaTelefone.fromJson(m))?.toList() ?? [];
    listaPessoaEndereco = (jsonDados['listaPessoaEndereco'] as Iterable)?.map((m) => PessoaEndereco.fromJson(m))?.toList() ?? [];
    listaPessoaContato = (jsonDados['listaPessoaContato'] as Iterable)?.map((m) => PessoaContato.fromJson(m))?.toList() ?? [];
  }

  Map<String, dynamic> get toJson {
    Map<String, dynamic> jsonDados = Map<String, dynamic>();
    jsonDados['id'] = this.id;
    jsonDados['nome'] = this.nome;
    jsonDados['tipo'] = (this.tipo ?? 'Física') == 'Física' ? 'F' : 'J'; //DropDownButton
    jsonDados['site'] = this.site;
    jsonDados['email'] = this.email;
    jsonDados['cliente'] = this.cliente == 'Sim' ? 'S' : 'N'; //DropDownButton
    jsonDados['fornecedor'] = this.fornecedor == 'Sim' ? 'S' : 'N'; //DropDownButton
    jsonDados['transportadora'] = this.transportadora == 'Sim' ? 'S' : 'N'; //DropDownButton
    jsonDados['colaborador'] = this.colaborador == 'Sim' ? 'S' : 'N'; //DropDownButton
    jsonDados['contador'] = this.contador == 'Sim' ? 'S' : 'N'; //DropDownButton
    jsonDados['pessoaFisica'] = this.pessoaFisica == null ? null : this.pessoaFisica.toJson;
    jsonDados['pessoaJuridica'] = this.pessoaJuridica == null ? null : this.pessoaJuridica.toJson;

    var listaPessoaTelefoneLocal = [];
    for (PessoaTelefone pessoaTelefone in this.listaPessoaTelefone ?? []) {
      listaPessoaTelefoneLocal.add(pessoaTelefone.toJson);
    }
    jsonDados['listaPessoaTelefone'] = listaPessoaTelefoneLocal;

    var listaPessoaEnderecoLocal = [];
    for (PessoaEndereco pessoaEndereco in this.listaPessoaEndereco ?? []) {
      listaPessoaEnderecoLocal.add(pessoaEndereco.toJson);
    }
    jsonDados['listaPessoaEndereco'] = listaPessoaEnderecoLocal;
    var listaPessoaContatoLocal = [];
    for (PessoaContato pessoaContato in this.listaPessoaContato ?? []) {
      listaPessoaContatoLocal.add(pessoaContato.toJson);
    }
    jsonDados['listaPessoaContato'] = listaPessoaContatoLocal;

    return jsonDados;
  }
}

String pessoaEncodeJson(Pessoa pessoa) {
  final jsonDados = pessoa.toJson;
  return json.encode(jsonDados);
}
