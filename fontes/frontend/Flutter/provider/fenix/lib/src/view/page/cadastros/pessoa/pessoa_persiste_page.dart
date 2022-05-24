import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart' show DragStartBehavior;
import 'package:fenix/src/model/cadastros/pessoa.dart';
import 'package:fenix/src/view/shared/valida_campo_formulario.dart';
import 'package:fenix/src/view/shared/view_util_lib.dart';

class PessoaPersistePage extends StatefulWidget {
  final Pessoa pessoa;
  final GlobalKey<FormState> formKey;
  final GlobalKey<ScaffoldState> scaffoldKey;
  final Function atualizaPessoaCallBack;

  const PessoaPersistePage({Key key, this.formKey, this.scaffoldKey, this.pessoa, this.atualizaPessoaCallBack}) : super(key: key);

  @override
  PessoaPersistePageState createState() => PessoaPersistePageState();
}

class PessoaPersistePageState extends State<PessoaPersistePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawerDragStartBehavior: DragStartBehavior.down,
      key: widget.scaffoldKey,
      body: SafeArea(
        top: false,
        bottom: false,
        child: Form(
          key: widget.formKey,
          autovalidate: true,
          child: Scrollbar(
            child: SingleChildScrollView(
              dragStartBehavior: DragStartBehavior.down,
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  const SizedBox(height: 24.0),
                  TextFormField(
                    decoration: ViewUtilLib.getInputDecorationPersistePage('Informe o nome da pessoa', 'Nome *', false),
                    onSaved: (String value) {
                      widget.pessoa.nome = value;
                    },
                    initialValue: widget.pessoa?.nome ?? '',
                    validator: ValidaCampoFormulario.validarObrigatorioAlfanumerico,
                    onChanged: (text) {
                      ViewUtilLib.paginaMestreDetalheAlterada = true;
                    },
                  ),
                  const SizedBox(height: 24.0),
                  InputDecorator(
                      decoration: ViewUtilLib.getInputDecorationPersistePage('Tipo de Pessoa: Física ou Jurídica', 'tipo', true),
                      isEmpty: widget.pessoa.tipo == null,
                      child: ViewUtilLib.getDropDownButton(widget.pessoa.tipo, (String newValue) {
                        ViewUtilLib.paginaMestreDetalheAlterada = true;
                        setState(() {
                          widget.pessoa.tipo = newValue;
                        });
                        widget.atualizaPessoaCallBack();
                      }, <String>['Física', 'Jurídica'])),
                  const SizedBox(height: 24.0),
                  TextFormField(
                      keyboardType: TextInputType.url,
                      decoration: ViewUtilLib.getInputDecorationPersistePage('Informe o site da pessoa', 'Site', true),
                      onSaved: (String value) {
                        widget.pessoa.site = value;
                      },
                      initialValue: widget.pessoa?.site ?? '',
                      onChanged: (text) {
                        ViewUtilLib.paginaMestreDetalheAlterada = true;
                      }),
                  const SizedBox(height: 24.0),
                  TextFormField(
                      keyboardType: TextInputType.emailAddress,
                      decoration: ViewUtilLib.getInputDecorationPersistePage('Informe o email da pessoa', 'Email', true),
                      onSaved: (String value) {
                        widget.pessoa.email = value;
                      },
                      initialValue: widget.pessoa?.email ?? '',
                      onChanged: (text) {
                        ViewUtilLib.paginaMestreDetalheAlterada = true;
                      }),
                  const SizedBox(height: 24.0),
                  InputDecorator(
                      decoration: ViewUtilLib.getInputDecorationPersistePage('Pessoa é cliente?', 'É cliente', true),
                      isEmpty: widget.pessoa.cliente == null,
                      child: ViewUtilLib.getDropDownButton(widget.pessoa.cliente, (String newValue) {
                        ViewUtilLib.paginaMestreDetalheAlterada = true;
                        setState(() {
                          widget.pessoa.cliente = newValue;
                        });
                      }, <String>['Sim', 'Não'])),
                  const SizedBox(height: 24.0),
                  InputDecorator(
                      decoration: ViewUtilLib.getInputDecorationPersistePage('Pessoa é forncecedor?', 'É fornecedor', true),
                      isEmpty: widget.pessoa.fornecedor == null,
                      child: ViewUtilLib.getDropDownButton(widget.pessoa.fornecedor, (String newValue) {
                        ViewUtilLib.paginaMestreDetalheAlterada = true;
                        setState(() {
                          widget.pessoa.fornecedor = newValue;
                        });
                      }, <String>['Sim', 'Não'])),
                  const SizedBox(height: 24.0),
                  InputDecorator(
                      decoration: ViewUtilLib.getInputDecorationPersistePage('Pessoa é transportadora?', 'É transportadora', true),
                      isEmpty: widget.pessoa.transportadora == null,
                      child: ViewUtilLib.getDropDownButton(widget.pessoa.transportadora, (String newValue) {
                        ViewUtilLib.paginaMestreDetalheAlterada = true;
                        setState(() {
                          widget.pessoa.transportadora = newValue;
                        });
                      }, <String>['Sim', 'Não'])),
                  const SizedBox(height: 24.0),
                  InputDecorator(
                      decoration: ViewUtilLib.getInputDecorationPersistePage('Pessoa é colaborador?', 'É colaborador', true),
                      isEmpty: widget.pessoa.colaborador == null,
                      child: ViewUtilLib.getDropDownButton(widget.pessoa.colaborador, (String newValue) {
                        ViewUtilLib.paginaMestreDetalheAlterada = true;
                        setState(() {
                          widget.pessoa.colaborador = newValue;
                        });
                      }, <String>['Sim', 'Não'])),
                  const SizedBox(height: 24.0),
                  InputDecorator(
                      decoration: ViewUtilLib.getInputDecorationPersistePage('Pessoa é contador?', 'É contador', true),
                      isEmpty: widget.pessoa.contador == null,
                      child: ViewUtilLib.getDropDownButton(widget.pessoa.contador, (String newValue) {
                        ViewUtilLib.paginaMestreDetalheAlterada = true;
                        setState(() {
                          widget.pessoa.contador = newValue;
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
}
