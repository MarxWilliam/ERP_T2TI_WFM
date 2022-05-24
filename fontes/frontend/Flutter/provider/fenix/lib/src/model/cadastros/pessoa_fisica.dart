import 'dart:convert';

import 'package:cpf_cnpj_validator/cpf_validator.dart';
import 'package:intl/intl.dart';

class PessoaFisica {
  int id;
  int idPessoa;
  int idNivelFormacao;
  int idEstadoCivil;
  String cpf;
  String rg;
  String orgaoRg;
  DateTime dataEmissaoRg;
  DateTime dataNascimento;
  String sexo;
  String raca;
  String nacionalidade;
  String naturalidade;
  String nomePai;
  String nomeMae;

  PessoaFisica({
    this.id,
    this.idPessoa,
    this.idNivelFormacao,
    this.idEstadoCivil,
    this.cpf,
    this.rg,
    this.orgaoRg,
    this.dataEmissaoRg,
    this.dataNascimento,
    this.sexo,
    this.raca,
    this.nacionalidade,
    this.naturalidade,
    this.nomePai,
    this.nomeMae,
  });

  static List<String> campos = <String>[
    'id',
    'id_nivel_formacao',
    'id_estado_civil',
    'cpf',
    'rg',
    'orgao_rg',
    'data_emissao_rg',
    'data_nascimento',
    'sexo',
    'raca',
    'nacionalidade',
    'naturalidade',
    'nome_pai',
    'nome_mae'
  ];
  static List<String> colunas = <String>[
    'Id',
    'Id Nível Formação',
    'Id Estado Civil',
    'CPF',
    'RG',
    'Orgão RG',
    'Data Emissão RG',
    'Data Nascimento',
    'Sexo',
    'Raça',
    'Nacionalidade',
    'Naturalidade',
    'Nome do Pai',
    'Nome da Mãe'
  ];

  PessoaFisica.fromJson(Map<String, dynamic> jsonDados) {
    id = jsonDados['id'];
    idPessoa = jsonDados['idPessoa'];
    idNivelFormacao = jsonDados['idNivelFormacao'];
    idEstadoCivil = jsonDados['idEstadoCivil'];
    cpf = jsonDados['cpf'];
    rg = jsonDados['rg'];
    orgaoRg = jsonDados['orgaoRg'];
    dataEmissaoRg = jsonDados['dataEmissaoRg'] != null ? DateTime.tryParse(jsonDados['dataEmissaoRg']) : null;
    dataNascimento = jsonDados['dataNascimento'] != null ? DateTime.tryParse(jsonDados['dataNascimento']) : null;
    sexo = getSexo(jsonDados['sexo']);
    raca = getRaca(jsonDados['raca']);
    nacionalidade = jsonDados['nacionalidade'];
    naturalidade = jsonDados['naturalidade'];
    nomePai = jsonDados['nomePai'];
    nomeMae = jsonDados['nomeMae'];
  }

  Map<String, dynamic> get toJson {
    Map<String, dynamic> jsonDados = Map<String, dynamic>();
    jsonDados['id'] = this.id ?? 0;
    jsonDados['idPessoa'] = this.idPessoa ?? 0;
    jsonDados['idNivelFormacao'] = this.idNivelFormacao ?? 0;
    jsonDados['idEstadoCivil'] = this.idEstadoCivil ?? 0;
    jsonDados['cpf'] = CPFValidator.strip(this.cpf);
    jsonDados['rg'] = this.rg;
    jsonDados['orgaoRg'] = this.orgaoRg;
    jsonDados['dataEmissaoRg'] = this.dataEmissaoRg != null ? DateFormat('yyyy-MM-ddT00:00:00').format(this.dataEmissaoRg) : null;
    jsonDados['dataNascimento'] = this.dataNascimento != null ? DateFormat('yyyy-MM-ddT00:00:00').format(this.dataNascimento) : null;
    jsonDados['sexo'] = this.sexo?.substring(0, 1);
    jsonDados['raca'] = this.raca?.substring(0, 1);
    jsonDados['nacionalidade'] = this.nacionalidade;
    jsonDados['naturalidade'] = this.naturalidade;
    jsonDados['nomePai'] = this.nomePai;
    jsonDados['nomeMae'] = this.nomeMae;
    return jsonDados;
  }
}

getSexo(String sexo) {
  switch (sexo) {
    case 'F':
      return 'Feminino';
      break;
    case 'M':
      return 'Mascolino';
      break;
    default:
      return null;
  }
}

getRaca(String raca) {
  switch (raca) {
    case 'B':
      return 'Branco';
      break;
    case 'N':
      return 'Negro';
      break;
    case 'P':
      return 'Pardo';
      break;
    case 'I':
      return 'Índio';
      break;
    default:
      return null;
  }
}

String pessoaFisicaEncodeJson(PessoaFisica pessoaFisica) {
  final jsonDados = pessoaFisica.toJson;
  return json.encode(jsonDados);
}
