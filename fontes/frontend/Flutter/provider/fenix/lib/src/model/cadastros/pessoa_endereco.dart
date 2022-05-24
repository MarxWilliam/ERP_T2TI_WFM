import 'dart:convert';

class PessoaEndereco {
  int id;
  int idPessoa;
  String logradouro;
  String numero;
  String complemento;
  String bairro;
  String cidade;
  String uf;
  String cep;
  int municipioIbge;
  String principal;
  String entrega;
  String cobranca;
  String correspondencia;

  PessoaEndereco(
      {this.id,
      this.idPessoa,
      this.logradouro,
      this.numero,
      this.complemento,
      this.bairro,
      this.cidade,
      this.uf,
      this.cep,
      this.municipioIbge,
      this.principal,
      this.entrega,
      this.cobranca,
      this.correspondencia});

  //campos do banco de dados
  static List<String> campos = <String>[
    'id',
    'logradouro',
    'numero',
    'complemento',
    'bairro',
    'cidade',
    'uf',
    'cep',
    'municipio_ibge',
    'principal',
    'entrega',
    'cobranca',
    'correspondencia'
  ];
  static List<String> colunas = <String>[
    'Id',
    'Logradouro',
    'Número',
    'Complemento',
    'Bairro',
    'Cidade',
    'UF',
    'Cep',
    'Múnicipio IBGE',
    'Principal',
    'Entrega',
    'Cobranca',
    'Correspondência'
  ];

  PessoaEndereco.fromJson(Map<String, dynamic> jsonDados) {
    id = jsonDados['id'];
    idPessoa = jsonDados['idPessoa'];
    logradouro = jsonDados['logradouro'];
    numero = jsonDados['numero'];
    complemento = jsonDados['complemento'];
    bairro = jsonDados['bairro'];
    cidade = jsonDados['cidade'];
    uf = jsonDados['uf'];
    cep = jsonDados['cep'];
    municipioIbge = jsonDados['municipioIbge'];
    principal = jsonDados['principal'] == 'S' ? 'Sim' : 'Não'; //DropdownButton
    entrega = jsonDados['entrega'] == 'S' ? 'Sim' : 'Não'; //DropdownButton
    cobranca = jsonDados['cobranca'] == 'S' ? 'Sim' : 'Não'; //DropdownButton
    correspondencia = jsonDados['correspondencia'] == 'S' ? 'Sim' : 'Não'; //DropdownButton
  }

  Map<String, dynamic> get toJson {
    Map<String, dynamic> jsonDados = Map<String, dynamic>();
    jsonDados['id'] = this.id ?? 0;
    jsonDados['idPessoa'] = this.idPessoa ?? 0;
    jsonDados['logradouro'] = this.logradouro;
    jsonDados['numero'] = this.numero;
    jsonDados['complemento'] = this.complemento;
    jsonDados['bairro'] = this.bairro;
    jsonDados['cidade'] = this.cidade;
    jsonDados['uf'] = this.uf;
    jsonDados['cep'] = this.cep;
    jsonDados['municipioIbge'] = this.municipioIbge ?? 0;
    jsonDados['principal'] = this.principal == 'Sim' ? 'S' : 'N'; //DropdownButton
    jsonDados['entrega'] = this.entrega == 'Sim' ? 'S' : 'N'; //DropdownButton
    jsonDados['cobranca'] = this.cobranca == 'Sim' ? 'S' : 'N'; //DropdownButton
    jsonDados['correspondencia'] = this.correspondencia == 'Sim' ? 'S' : 'N'; //DropdownButton
    return jsonDados;
  }
}

String pessoaEnderecoEncodeJson(PessoaEndereco pessoaEndereco) {
  final jsonDados = pessoaEndereco.toJson;
  return json.encode(jsonDados);
}
