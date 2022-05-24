import 'dart:convert';

class Filtro {
  String campo;
  String valor;
  String dataInicial;
  String dataFinal;

  Filtro({this.campo, this.valor, this.dataInicial, this.dataFinal});

  Filtro.fromJson(Map<String, dynamic> jsonDados) {
    campo = jsonDados['campo'];
    valor = jsonDados['valor'];
    dataInicial = jsonDados['datainicial'];
    dataFinal = jsonDados['dataFinal'];
  }

  Map<String, dynamic> toJson() {
    Map<String, dynamic> jsonDados = new Map<String, dynamic>();
    jsonDados['campo'] = this.campo;
    jsonDados['valor'] = this.valor;
    jsonDados['datainicial'] = this.dataInicial;
    jsonDados['dataFinal'] = this.dataFinal;
    return jsonDados;
  }
}

String filtroEncodeJson(Filtro filtro) {
  final jsonDados = filtro.toJson();
  return json.encode(jsonDados);
}
