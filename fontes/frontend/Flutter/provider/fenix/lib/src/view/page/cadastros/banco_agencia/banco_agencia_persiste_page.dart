import 'package:fenix/src/model/cadastros/banco.dart';
import 'package:fenix/src/model/cadastros/banco_agencia.dart';
import 'package:fenix/src/view/shared/lookup_page.dart';
import 'package:fenix/src/view/shared/valida_campo_formulario.dart';
import 'package:fenix/src/view/shared/view_util_lib.dart';
import 'package:fenix/src/view_model/banco_agencia_view_model.dart';
import 'package:flutter/material.dart';
import 'dart:async';
import 'package:flutter/services.dart';
import 'package:flutter/gestures.dart' show DragStartBehavior;
import 'package:provider/provider.dart';

class BancoAgenciaPersistePage extends StatefulWidget {
  final BancoAgencia bancoAgencia;
  final String title;
  final String operacao;

  const BancoAgenciaPersistePage({Key key, this.bancoAgencia, this.title, this.operacao}) : super(key: key);

  @override
  BancoAgenciaPersistePageState createState() => BancoAgenciaPersistePageState();
}

class BancoAgenciaPersistePageState extends State<BancoAgenciaPersistePage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool _autoValidate = false;
  bool _formFoiAlterado = false;

  @override
  Widget build(BuildContext context) {
    var bancoAgenciaProvider = Provider.of<BancoAgenciaViewModel>(context);
    var importaBancoController = TextEditingController();
    importaBancoController.text = widget.bancoAgencia?.banco?.nome ?? '';

    return Scaffold(
      drawerDragStartBehavior: DragStartBehavior.down,
      key: _scaffoldKey,
      appBar: AppBar(
        title: Text(widget.title),
        actions: <Widget>[
          IconButton(
            icon: const Icon(Icons.save, color: Colors.white),
            onPressed: () async {
              final FormState form = _formKey.currentState;
              if (!form.validate()) {
                _autoValidate = true;
                ViewUtilLib.showInSnackBar('Por favor, corriga os erros apresentados antes de continuar.', _scaffoldKey);
              } else {
                form.save();
                if (widget.operacao == 'A') {
                  await bancoAgenciaProvider.alterar(widget.bancoAgencia);
                } else {
                  await bancoAgenciaProvider.inserir(widget.bancoAgencia);
                }
                Navigator.pop(context);
              }
            },
          ),
        ],
      ),
      body: SafeArea(
        top: false,
        bottom: false,
        child: Form(
          key: _formKey,
          autovalidate: _autoValidate,
          onWillPop: _avisaUsuarioFormAlterado,
          child: Scrollbar(
            child: SingleChildScrollView(
              dragStartBehavior: DragStartBehavior.down,
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  const SizedBox(height: 24.0),
                  Row(
                    children: <Widget>[
                      Expanded(
                          flex: 1,
                          child: Container(
                            child: TextFormField(
                              controller: importaBancoController,
                              readOnly: true,
                              decoration: const InputDecoration(
                                border: UnderlineInputBorder(),
                                filled: true,
                                hintText: 'Importe o banco vinculado',
                                labelText: 'Banco *',
                              ),
                              onSaved: (String value) {
                                widget.bancoAgencia.banco.nome = value;
                              },
                              //initialValue: widget.bancoAgencia?.idBanco ?? '',
                              validator: ValidaCampoFormulario.validarObrigatorioAlfanumerico,
                              onChanged: (text) {
                                _formFoiAlterado = true;
                              },
                            ),
                          )),
                      Expanded(
                        flex: 0,
                        child: IconButton(
                            tooltip: 'Importar Banco',
                            icon: const Icon(Icons.search),
                            onPressed: () async {
                              Map<String, dynamic> objetoJsonRetorno = await Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (BuildContext context) => LookupPage(
                                    title: 'Importar Banco',
                                    colunas: Banco.colunas,
                                    campos: Banco.campos,
                                    rota: '/banco',
                                  ),
                                  fullscreenDialog: true,
                                ),
                              );
                              if (objetoJsonRetorno != null) {
                                if (objetoJsonRetorno['nome'] != null) {
                                  importaBancoController.text = objetoJsonRetorno['nome'];
                                  widget.bancoAgencia.idBanco = objetoJsonRetorno['id'];
                                  widget.bancoAgencia.banco = new Banco.fromJson(objetoJsonRetorno);
                                }
                              }
                            }),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24.0),
                  TextFormField(
                    decoration: const InputDecoration(
                      border: UnderlineInputBorder(),
                      filled: true,
                      hintText: 'Informe o número da agência',
                      labelText: 'Número *',
                    ),
                    keyboardType: TextInputType.phone,
                    onSaved: (String value) {
                      widget.bancoAgencia.numero = value;
                    },
                    initialValue: widget.bancoAgencia?.numero ?? '',
                    validator: ValidaCampoFormulario.validarObrigatorioNumerico,
                    onChanged: (text) {
                      _formFoiAlterado = true;
                    },
                  ),
                  const SizedBox(height: 24.0),
                  TextFormField(
                      decoration: const InputDecoration(
                        border: UnderlineInputBorder(),
                        filled: true,
                        hintText: 'Informe o dígito do número da agência',
                        labelText: 'Dígito *',
                      ),
                      onSaved: (String value) {
                        widget.bancoAgencia.digito = value;
                      },
                      initialValue: widget.bancoAgencia?.digito ?? '',
                      validator: ValidaCampoFormulario.validarObrigatorioNumerico,
                      onChanged: (text) {
                        _formFoiAlterado = true;
                      }),
                  TextFormField(
                      decoration: const InputDecoration(
                        border: UnderlineInputBorder(),
                        filled: true,
                        hintText: 'Informe o nome da agência',
                        labelText: 'Nome',
                      ),
                      onSaved: (String value) {
                        widget.bancoAgencia.nome = value;
                      },
                      initialValue: widget.bancoAgencia?.nome ?? '',
                      validator: ValidaCampoFormulario.validarObrigatorioAlfanumerico,
                      onChanged: (text) {
                        _formFoiAlterado = true;
                      }),
                  TextFormField(
                      decoration: const InputDecoration(
                        border: UnderlineInputBorder(),
                        filled: true,
                        hintText: 'Informe o telefone da agência',
                        labelText: 'Telefone',
                      ),
                      onSaved: (String value) {
                        widget.bancoAgencia.telefone = value;
                      },
                      initialValue: widget.bancoAgencia?.telefone ?? '',
                      onChanged: (text) {
                        _formFoiAlterado = true;
                      }),
                  TextFormField(
                      decoration: const InputDecoration(
                        border: UnderlineInputBorder(),
                        filled: true,
                        hintText: 'Informe o contato da agência',
                        labelText: 'Contato',
                      ),
                      onSaved: (String value) {
                        widget.bancoAgencia.contato = value;
                      },
                      initialValue: widget.bancoAgencia?.contato ?? '',
                      onChanged: (text) {
                        _formFoiAlterado = true;
                      }),
                  TextFormField(
                      decoration: const InputDecoration(
                        border: UnderlineInputBorder(),
                        filled: true,
                        hintText: 'Adicione uma observação',
                        labelText: 'Observação',
                      ),
                      onSaved: (String value) {
                        widget.bancoAgencia.observacao = value;
                      },
                      initialValue: widget.bancoAgencia?.observacao ?? '',
                      //validator: _validateName,
                      onChanged: (text) {
                        _formFoiAlterado = true;
                      }),
                  TextFormField(
                      decoration: const InputDecoration(
                        border: UnderlineInputBorder(),
                        filled: true,
                        hintText: 'Informe o nome do gerente',
                        labelText: 'Gerente',
                      ),
                      onSaved: (String value) {
                        widget.bancoAgencia.gerente = value;
                      },
                      initialValue: widget.bancoAgencia?.gerente ?? '',
                      //validator: _validateName,
                      onChanged: (text) {
                        _formFoiAlterado = true;
                      }),
                  const SizedBox(height: 24.0),
                  Text(
                    '* indíca que o campo é obrigatório',
                    style: Theme.of(context).textTheme.caption,
                  ),
                  const SizedBox(height: 24.0),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Future<bool> _avisaUsuarioFormAlterado() async {
    final FormState form = _formKey.currentState;
    if (form == null || !_formFoiAlterado) return true;
    return await ViewUtilLib.geraDialogBoxFormAlterado(context);
  }
}
