import 'dart:convert';

import 'package:fenix/src/model/retorno_json_erro.dart';
import 'package:fenix/src/service/cadastros/service_base.dart';
import 'package:fenix/src/view/shared/erro_page.dart';
import 'package:http/http.dart' as http;
import 'package:fenix/src/view/shared/view_util_lib.dart';
import 'package:flutter/material.dart';
import 'package:fenix/src/model/filtro.dart';

class LookupPage extends StatefulWidget {
  final String title;
  final List<String> colunas;
  final List<String> campos;
  final String rota;

  const LookupPage({Key key, this.title, this.colunas, this.campos, this.rota}) : super(key: key);

  @override
  LookupPageState createState() => LookupPageState();
}

class LookupPageState extends State<LookupPage> {
  String campoFiltro;
  static bool _dadosCarregados = true;
  static var objetoJsonErro = RetornoJsonErro();
  List<DataRow> _rowList = [];
  var valorFiltroController = TextEditingController();
  static Map<String, dynamic> resultadoFiltro = {};

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        title: Text(widget.title),
        actions: <Widget>[
          IconButton(
              icon: const Icon(Icons.search, color: Colors.white),
              onPressed: () async {
                if (campoFiltro == null) {
                  ViewUtilLib.showInSnackBar('Por favor, selecione a coluna para o filtro.', _scaffoldKey);
                } else {
                  if (valorFiltroController.text == '') {
                    ViewUtilLib.showInSnackBar('Por favor, informe um valor para o filtro.', _scaffoldKey);
                  } else {
                    //refresca tela
                    setState(() {
                      _dadosCarregados = false;
                    });

                    _rowList.clear();
                    var filtro = new Filtro();
                    filtro.campo = widget.campos[int.parse(campoFiltro)];
                    filtro.valor = valorFiltroController.text;
                    await filtrarServidor(filtro);
                  }
                }
              }),
        ],
      ),
      body: Form(
        key: _formKey,
        child: SafeArea(
          child: ListView(
            padding: const EdgeInsets.all(16.0),
            children: <Widget>[
              InputDecorator(
                decoration: InputDecoration(labelText: 'Coluna', hintText: 'Selecione a coluna para o filtro', contentPadding: EdgeInsets.zero),
                isEmpty: campoFiltro == null,
                child: DropdownButton<String>(
                  isExpanded: true,
                  value: campoFiltro,
                  onChanged: (String newValue) {
                    setState(() {
                      campoFiltro = newValue;
                    });
                  },
                  items: widget.colunas.map<DropdownMenuItem<String>>((String value) {
                    return DropdownMenuItem<String>(
                      value: widget.colunas.indexOf(value).toString(),
                      child: Text(value),
                    );
                  }).toList(),
                ),
              ),
              const SizedBox(height: 1.0),
              Container(
                height: 90.0,
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                alignment: Alignment.bottomLeft,
                child: TextFormField(
                  controller: valorFiltroController,
                  decoration: const InputDecoration(
                    labelText: 'Valor',
                    hintText: 'Informe o valor do Filtro',
                    filled: true,
                  ),
                ),
              ),
              const SizedBox(height: 10.0),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.all(8.0),
                child: _dadosCarregados == false
                    ? Center(
                        child: objetoJsonErro == null ? Center(child: CircularProgressIndicator()) : ErroPage(objetoJsonErro: objetoJsonErro))
                    : DataTable(columns: getColumns(), rows: _rowList),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future filtrarServidor(Filtro filtro) async {
    //pega service base
    var serviceBase = new ServiceBase();
    serviceBase.tratarFiltro(filtro, widget.rota);
    //chama a API REST
    http.Response response = await http.get(serviceBase.url);

    if (response.statusCode == 200 || response.statusCode == 201) {
      var listaDadosJson = json.decode(response.body) as List<dynamic>;
      //faz o laço na lista de registros que desceu do servidor
      for (var objetoJson in listaDadosJson) {
        //cria o arry que vai armazenar as células - cada linha da coluna possui um arry de células
        List<DataCell> celulas = new List<DataCell>();

        //pega os valores do registro e converte para uma lista
        var registro = objetoJson.values.toList();

        //faz o laço das colunas do registro para inserir o DataTable
        for (var i = 0; i < registro.length; i++) {
          DataCell celula = new DataCell(Text(registro[i].toString()), onTap: () {
            resultadoFiltro = objetoJson;
            Navigator.pop(context, resultadoFiltro);
          });
          celulas.add(celula);
        }
        _rowList.add(DataRow(cells: celulas));
      }
      //refresca tela
      setState(() {
        _dadosCarregados = true;
      });
    } else {
      _dadosCarregados = false;
      tratarErro(json.decode(response.body));
    }
  }

  List<DataColumn> getColumns() {
    List<DataColumn> lista = new List<DataColumn>();
    for (var i = 0; i < widget.colunas.length; i++) {
      lista.add(DataColumn(label: Text(widget.colunas[i])));
    }
    return lista;
  }

  void tratarErro(Map<String, dynamic> erro) {
    objetoJsonErro.status = erro['status']?.toString() ?? erro['statuscode'].toString();
    objetoJsonErro.error = erro['error'] ?? erro['classname'].toString();
    objetoJsonErro.message = erro['message'];
    objetoJsonErro.trace = erro['trace'];
  }
}
