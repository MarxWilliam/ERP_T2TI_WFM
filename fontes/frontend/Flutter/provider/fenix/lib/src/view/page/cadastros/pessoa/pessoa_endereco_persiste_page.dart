import 'package:fenix/src/model/cadastros/pessoa.dart';
import 'package:fenix/src/model/cadastros/pessoa_endereco.dart';
import 'package:fenix/src/view/shared/valida_campo_formulario.dart';
import 'package:fenix/src/view/shared/view_util_lib.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

class PessoaEnderecoPersistePage extends StatefulWidget {
  final Pessoa pessoa;
  final PessoaEndereco pessoaEndereco;
  final String title;
  final String operacao;

  PessoaEnderecoPersistePage({Key key, this.pessoa, this.pessoaEndereco, this.title, this.operacao}) : super(key: key);

  @override
  _PessoaEnderecoPersistePageState createState() => _PessoaEnderecoPersistePageState();
}

class _PessoaEnderecoPersistePageState extends State<PessoaEnderecoPersistePage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  bool _autoValidate = false;
  bool _formFoiAlterado = false;

  @override
  Widget build(BuildContext context) {
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
                  ViewUtilLib.showInSnackBar('Por favor, corrija os erros apresentados antes de continuar', _scaffoldKey);
                } else {
                  form.save();
                  Navigator.pop(context);
                }
              }),
        ],
      ),
      body: SafeArea(
        top: false,
        bottom: false,
        child: Form(
          key: _formKey,
          autovalidate: _autoValidate,
          onWillPop: _avisarUsuarioFormAlterado,
          child: Scrollbar(
            child: SingleChildScrollView(
              dragStartBehavior: DragStartBehavior.down,
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  const SizedBox(height: 24.0),
                  TextFormField(
                    decoration: ViewUtilLib.getInputDecorationPersistePage('Informe o Logradouro', 'Logradouro *', false),
                    onSaved: (String value) {
                      widget.pessoaEndereco.logradouro = value;
                    },
                    initialValue: widget.pessoaEndereco?.logradouro ?? '',
                    validator: ValidaCampoFormulario.validarObrigatorioAlfanumerico,
                    onChanged: (text) {
                      ViewUtilLib.paginaMestreDetalheAlterada = true;
                      _formFoiAlterado = true;
                    },
                  ),
                  const SizedBox(height: 24.0),
                  TextFormField(
                    keyboardType: TextInputType.emailAddress,
                    decoration: ViewUtilLib.getInputDecorationPersistePage('Informe o Número', 'Número', false),
                    onSaved: (String value) {
                      widget.pessoaEndereco.numero = value;
                    },
                    initialValue: widget.pessoaEndereco?.numero ?? '',
                    onChanged: (text) {
                      ViewUtilLib.paginaMestreDetalheAlterada = true;
                      _formFoiAlterado = true;
                    },
                  ),
                  const SizedBox(height: 24.0),
                  TextFormField(
                    decoration: ViewUtilLib.getInputDecorationPersistePage('Informe o Complemento', 'Complemento', false),
                    onSaved: (String value) {
                      widget.pessoaEndereco.complemento = value;
                    },
                    initialValue: widget.pessoaEndereco?.complemento ?? '',
                    //validator: ValidaCampoFormulario.validarObrigatorioAlfanumerico,
                    onChanged: (text) {
                      ViewUtilLib.paginaMestreDetalheAlterada = true;
                      _formFoiAlterado = true;
                    },
                  ),
                  const SizedBox(height: 24.0),
                  TextFormField(
                    decoration: ViewUtilLib.getInputDecorationPersistePage('Informe o Bairro', 'Bairro', false),
                    onSaved: (String value) {
                      widget.pessoaEndereco.bairro = value;
                    },
                    initialValue: widget.pessoaEndereco?.bairro ?? '',
                    //validator: ValidaCampoFormulario.validarObrigatorioAlfanumerico,
                    onChanged: (text) {
                      ViewUtilLib.paginaMestreDetalheAlterada = true;
                      _formFoiAlterado = true;
                    },
                  ),
                  const SizedBox(height: 24.0),
                  TextFormField(
                    decoration: ViewUtilLib.getInputDecorationPersistePage('Informe á Cidade', 'Cidade *', false),
                    onSaved: (String value) {
                      widget.pessoaEndereco.cidade = value;
                    },
                    initialValue: widget.pessoaEndereco?.cidade ?? '',
                    validator: ValidaCampoFormulario.validarObrigatorioAlfanumerico,
                    onChanged: (text) {
                      ViewUtilLib.paginaMestreDetalheAlterada = true;
                      _formFoiAlterado = true;
                    },
                  ),
                  const SizedBox(height: 24.0),
                  InputDecorator(
                      decoration: ViewUtilLib.getInputDecorationPersistePage('Informe o UF', 'UF', true),
                      isEmpty: widget.pessoaEndereco.uf == null,
                      child: ViewUtilLib.getDropDownButton(widget.pessoaEndereco.uf, (String newValue) {
                        ViewUtilLib.paginaMestreDetalheAlterada = true;
                        setState(() {
                          widget.pessoaEndereco.uf = newValue;
                        });
                      }, ViewUtilLib.listaUF)),
                  const SizedBox(height: 24.0),
                  TextFormField(
                    decoration: ViewUtilLib.getInputDecorationPersistePage('Informe o CEP', 'CEP', false),
                    onSaved: (String value) {
                      widget.pessoaEndereco.cep = value;
                    },
                    initialValue: widget.pessoaEndereco?.cep ?? '',
                    //validator: ValidaCampoFormulario.validarObrigatorioAlfanumerico,
                    onChanged: (text) {
                      ViewUtilLib.paginaMestreDetalheAlterada = true;
                      _formFoiAlterado = true;
                    },
                  ),
                  const SizedBox(height: 24.0),
                  TextFormField(
                    decoration: ViewUtilLib.getInputDecorationPersistePage('Informe o Municíopio IBGE', 'Município IBGE', false),
                    onSaved: (String value) {
                      widget.pessoaEndereco.municipioIbge = int.tryParse(value);
                    },
                    initialValue: widget.pessoaEndereco?.municipioIbge.toString() ?? '',
                    //validator: ValidaCampoFormulario.validarObrigatorioNumerico,
                    onChanged: (text) {
                      ViewUtilLib.paginaMestreDetalheAlterada = true;
                      _formFoiAlterado = true;
                    },
                  ),
                  const SizedBox(height: 24.0),
                  InputDecorator(
                      decoration: ViewUtilLib.getInputDecorationPersistePage('É Endereço Pricipal?', 'Principal', true),
                      isEmpty: widget.pessoaEndereco.principal == null,
                      child: ViewUtilLib.getDropDownButton(widget.pessoaEndereco.principal, (String newValue) {
                        ViewUtilLib.paginaMestreDetalheAlterada = true;
                        setState(() {
                          widget.pessoaEndereco.principal = newValue;
                        });
                      }, <String>['Sim', 'Não'])),
                  const SizedBox(height: 24.0),
                  InputDecorator(
                      decoration: ViewUtilLib.getInputDecorationPersistePage('É Endereço de Entrega?', 'Entrega', true),
                      isEmpty: widget.pessoaEndereco.entrega == null,
                      child: ViewUtilLib.getDropDownButton(widget.pessoaEndereco.entrega, (String newValue) {
                        ViewUtilLib.paginaMestreDetalheAlterada = true;
                        setState(() {
                          widget.pessoaEndereco.entrega = newValue;
                        });
                      }, <String>['Sim', 'Não'])),
                  const SizedBox(height: 24.0),
                  InputDecorator(
                      decoration: ViewUtilLib.getInputDecorationPersistePage('É Endereço de cobrança?', 'Cobrança', true),
                      isEmpty: widget.pessoaEndereco.cobranca == null,
                      child: ViewUtilLib.getDropDownButton(widget.pessoaEndereco.cobranca, (String newValue) {
                        ViewUtilLib.paginaMestreDetalheAlterada = true;
                        setState(() {
                          widget.pessoaEndereco.cobranca = newValue;
                        });
                      }, <String>['Sim', 'Não'])),
                  const SizedBox(height: 24.0),
                  InputDecorator(
                      decoration: ViewUtilLib.getInputDecorationPersistePage('É Endereço de Correspondência?', 'Correspondencia', true),
                      isEmpty: widget.pessoaEndereco.correspondencia == null,
                      child: ViewUtilLib.getDropDownButton(widget.pessoaEndereco.correspondencia, (String newValue) {
                        ViewUtilLib.paginaMestreDetalheAlterada = true;
                        setState(() {
                          widget.pessoaEndereco.correspondencia = newValue;
                        });
                      }, <String>['Sim', 'Não'])),
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

  Future<bool> _avisarUsuarioFormAlterado() async {
    final FormState form = _formKey.currentState;
    if (form == null || !_formFoiAlterado) return true;

    return await ViewUtilLib.geraDialogBoxFormAlterado(context);
  }
}
