import 'package:fenix/src/model/cadastros/banco.dart';
import 'package:fenix/src/view/shared/valida_campo_formulario.dart';
import 'package:fenix/src/view/shared/view_util_lib.dart';
import 'package:fenix/src/view_model/banco_view_model.dart';
import 'package:flutter/material.dart';
import 'dart:async';
import 'package:flutter/services.dart';
import 'package:flutter/gestures.dart' show DragStartBehavior;
import 'package:provider/provider.dart';

class BancoPersistePage extends StatefulWidget {
  final Banco banco;
  final String title;
  final String operacao;

  const BancoPersistePage({Key key, this.banco, this.title, this.operacao}) : super(key: key);

  @override
  BancoPersistePageState createState() => BancoPersistePageState();
}

class BancoPersistePageState extends State<BancoPersistePage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool _autoValidate = false;
  bool _formFoiAlterado = false;

  @override
  Widget build(BuildContext context) {
    var bancoProvider = Provider.of<BancoViewModel>(context);

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
                  await bancoProvider.alterar(widget.banco);
                } else {
                  await bancoProvider.inserir(widget.banco);
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
                  TextFormField(
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(
                      border: UnderlineInputBorder(),
                      filled: true,
                      hintText: 'Informe o código FEBRABAM para o banco.',
                      labelText: 'Código *',
                    ),
                    onSaved: (String value) {
                      widget.banco.codigo = value;
                    },
                    initialValue: widget.banco?.codigo ?? '',
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
                      hintText: 'Informe o nome do Banco',
                      labelText: 'Nome *',
                    ),
                    keyboardType: TextInputType.phone,
                    onSaved: (String value) {
                      widget.banco.nome = value;
                    },
                    initialValue: widget.banco?.nome ?? '',
                    validator: ValidaCampoFormulario.validarObrigatorioAlfanumerico,
                    onChanged: (text) {
                      _formFoiAlterado = true;
                    },
                  ),
                  const SizedBox(height: 24.0),
                  TextFormField(
                      decoration: const InputDecoration(
                        border: UnderlineInputBorder(),
                        filled: true,
                        hintText: 'Informe a Url do Banco',
                        labelText: 'URL',
                      ),
                      onSaved: (String value) {
                        widget.banco.url = value;
                      },
                      initialValue: widget.banco?.url ?? '',
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
