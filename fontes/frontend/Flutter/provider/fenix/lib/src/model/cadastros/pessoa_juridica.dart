import 'dart:convert';

import 'package:cpf_cnpj_validator/cnpj_validator.dart';
import 'package:intl/intl.dart';

class PessoaJuridica {
  int id;
  int idPessoa;
  String cnpj;
  String nomeFantasia;
  String inscricaoEstadual;
  String inscricaoMunicipal;
  DateTime dataConstituicao;
  String tipoDeRegime;
  String crt;

  PessoaJuridica(
      {this.id,
      this.idPessoa,
      this.cnpj,
      this.nomeFantasia,
      this.inscricaoEstadual,
      this.inscricaoMunicipal,
      this.dataConstituicao,
      this.tipoDeRegime,
      this.crt});

  //campos do banco de dados
  static List<String> campos = <String>[
    'id',
    'id_pessoa',
    'cnpj',
    'nome_fantasia',
    'inscricao_estadual',
    'inscricao_municipal',
    'data_constituicao',
    'tipo_de_regime',
    'crt'
  ];
  static List<String> colunas = <String>[
    'Id',
    'Id Pessoa',
    'CNPJ',
    'Nome Fantasia',
    'Inscrição Estadual',
    'Inscrição Municipal',
    'Data Constituição',
    'Tipo De Regime',
    'CRT'
  ];

  PessoaJuridica.fromJson(Map<String, dynamic> jsonDados) {
    id = jsonDados['id'];
    idPessoa = jsonDados['idPessoa'];
    cnpj = jsonDados['cnpj'];
    nomeFantasia = jsonDados['nomeFantasia'];
    inscricaoEstadual = jsonDados['inscricaoEstadual'];
    inscricaoMunicipal = jsonDados['inscricaoMunicipal'];
    dataConstituicao = jsonDados['dataConstituicao'] != null ? DateTime.parse(jsonDados['dataConstituicao']) : null;
    tipoDeRegime = getTipoRegime(jsonDados['tipoDeRegime']);
    crt = getCrt(jsonDados['crt']);
  }

  Map<String, dynamic> get toJson {
    Map<String, dynamic> jsonDados = Map<String, dynamic>();
    jsonDados['id'] = this.id;
    jsonDados['idPessoa'] = this.idPessoa;
    jsonDados['cnpj'] = CNPJValidator.strip(this.cnpj);
    jsonDados['nomeFantasia'] = this.nomeFantasia;
    jsonDados['inscricaoEstadual'] = this.inscricaoEstadual;
    jsonDados['inscricaoMunicipal'] = this.inscricaoMunicipal;
    jsonDados['dataConstituicao'] = this.dataConstituicao != null ? DateFormat('yyyy-MM-ddT00:00:00').format(this.dataConstituicao) : null;
    jsonDados['tipoDeRegime'] = this.tipoDeRegime?.substring(0, 1);
    jsonDados['crt'] = this.crt?.substring(0, 1);
    return jsonDados;
  }
}

getTipoRegime(String tipoRegime) {
  switch (tipoRegime) {
    case '1':
      return '1-Lucro Real';
      break;
    case '2':
      return '2-Lucro Presumido';
      break;
    case '3':
      return '3-Simples Nacional';
      break;
    default:
      return null;
  }
}

getCrt(String crt) {
  switch (crt) {
    case '1':
      return '1-Simples Nacional';
      break;
    case '2':
      return '2-Simples Nacional - Excesso';
      break;
    case '3':
      return '3-Regime Normal';
      break;
    default:
      return null;
  }
}

String pessoaJuridicaEncodeJson(PessoaJuridica pessoaJuridica) {
  final jsonDados = pessoaJuridica.toJson;
  return json.encode(jsonDados);
}
