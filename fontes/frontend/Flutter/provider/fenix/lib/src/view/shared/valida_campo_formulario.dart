//valida os campos do formulário
import 'package:cpf_cnpj_validator/cnpj_validator.dart';
import 'package:cpf_cnpj_validator/cpf_validator.dart';

class ValidaCampoFormulario {
  factory ValidaCampoFormulario() {
    _this ??= ValidaCampoFormulario._();
    return _this;
  }
  static ValidaCampoFormulario _this;
  ValidaCampoFormulario._() : super();

  ///valida campo obrigatório
  static String validaObrigatorio(String value) {
    if (value.isEmpty) return 'Obrigatório informar esse campo.';
    return null;
  }

  ///valida campo obrigatório e verifica se os caracteres são alfanuméricos
  static String validarObrigatorioAlfanumerico(String value) {
    var campoObrigatorio = validaObrigatorio(value);
    if (campoObrigatorio == null) {
      final RegExp nameExp = RegExp(r'^[A-Za-z0-9. ]+$');
      if (!nameExp.hasMatch(value)) return 'Por favor, informe apenas caracteres alfanuméricos.';
    } else {
      return campoObrigatorio;
    }
    return null;
  }

  ///valida campo obrigatório e verifica se os caracteres são alfanuméricos
  static String validarObrigatorioAlfa(String value) {
    var campoObrigatorio = validaObrigatorio(value);
    if (campoObrigatorio == null) {
      final RegExp nameExp = RegExp(r'^[A-Za-z. ]+$');
      if (!nameExp.hasMatch(value)) return 'Por favor, informe apenas caracteres alfabéticos.';
    } else {
      return campoObrigatorio;
    }
    return null;
  }

  ///valida campo obrigatório e verifica se os caracteres são F ou J
  static String validarObrigatorioTipoPessoa(String value) {
    var campoObrigatorio = validaObrigatorio(value);
    if (campoObrigatorio == null) {
      final RegExp nameExp = RegExp(r'^[FJ]$');
      if (!nameExp.hasMatch(value)) return 'Por favor, informe apenas "F" para Física, ou "J" para Jurídica.';
    } else {
      return campoObrigatorio;
    }
    return null;
  }

  ///valida campo obrigatório e verifica se os caracteres são F ou J
  static String validarObrigatorioSimOuNao(String value) {
    var campoObrigatorio = validaObrigatorio(value);
    if (campoObrigatorio == null) {
      final RegExp nameExp = RegExp(r'^[SN]$');
      if (!nameExp.hasMatch(value)) return 'Por favor, informe apenas "S" para SIM, ou "N" para NÃO.';
    } else {
      return campoObrigatorio;
    }
    return null;
  }

  ///valida campo obrigatório e verifica se os caracteres são numéricos
  static String validarObrigatorioNumerico(String value) {
    var campoObrigatorio = validaObrigatorio(value);
    if (campoObrigatorio == null) {
      final RegExp nameExp = RegExp(r'^[0-9]+$');
      if (!nameExp.hasMatch(value)) return 'Por favor, informe apenas caracteres numéricos.';
    } else {
      return campoObrigatorio;
    }
    return null;
  }

  static String validarCNPJ(String value) {
    var cnpjValido = CNPJValidator.isValid(value);
    if (cnpjValido) {
      return null;
    } else {
      return 'Favor informe um CNPJ válido.';
    }
  }

  static String validarCPF(String value) {
    var cpfValido = CPFValidator.isValid(value);
    if (cpfValido) {
      return null;
    } else {
      return 'Favor informe um CPF válido.';
    }
  }
}
