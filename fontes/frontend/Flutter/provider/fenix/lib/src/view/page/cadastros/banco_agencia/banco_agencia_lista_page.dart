import 'package:fenix/src/model/cadastros/banco_agencia.dart';
import 'package:fenix/src/model/filtro.dart';
import 'package:fenix/src/view/page/cadastros/banco_agencia/banco_agencia_persiste_page.dart';
import 'package:fenix/src/view/shared/erro_page.dart';
import 'package:fenix/src/view/shared/filtro_page.dart';
import 'package:fenix/src/view_model/banco_agencia_view_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class BancoAgenciaListaPage extends StatefulWidget {
  @override
  _BancoAgenciaListaPageState createState() => _BancoAgenciaListaPageState();
}

class _BancoAgenciaListaPageState extends State<BancoAgenciaListaPage> {
  int _rowsPerPage = PaginatedDataTable.defaultRowsPerPage;
  int _sortColumnIndex;
  bool _sortAscending = true;

  @override
  Widget build(BuildContext context) {
    var listaBancoAgencia = Provider.of<BancoAgenciaViewModel>(context).listaBancoAgencia;
    var colunas = BancoAgencia.colunas;
    var campos = BancoAgencia.campos;

    final BancoAgenciaDataSource _bancoAgenciaDataSource = BancoAgenciaDataSource(listaBancoAgencia, context);

    void _sort<T>(Comparable<T> getField(BancoAgencia bancoAgencia), int columnIndex, bool ascending) {
      _bancoAgenciaDataSource._sort<T>(getField, ascending);
      setState(() {
        _sortColumnIndex = columnIndex;
        _sortAscending = ascending;
      });
    }

    if (Provider.of<BancoAgenciaViewModel>(context).objetoJsonErro != null) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Cadastro - Banco Agência'),
          actions: <Widget>[],
        ),
        body: ErroPage(
          objetoJsonErro: Provider.of<BancoAgenciaViewModel>(context).objetoJsonErro, //ErrorPage
        ),
      );
    } else {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Cadastro - Banco Agência'),
          actions: <Widget>[],
        ),
        body: RefreshIndicator(
          onRefresh: _refrescaTela,
          child: Scrollbar(
            child: listaBancoAgencia == null
                ? Center(
                    child: Provider.of<BancoAgenciaViewModel>(context).objetoJsonErro == null
                        ? Center(
                            child: CircularProgressIndicator(),
                          )
                        : ErroPage(
                            objetoJsonErro: Provider.of<BancoAgenciaViewModel>(context).objetoJsonErro,
                          ),
                  )
                : ListView(
                    padding: const EdgeInsets.all(8.0),
                    children: <Widget>[
                      PaginatedDataTable(
                        header: const Text('Relação de Banco Agências'),
                        rowsPerPage: _rowsPerPage,
                        onRowsPerPageChanged: (int value) {
                          setState(() {
                            _rowsPerPage = value;
                          });
                        },
                        sortColumnIndex: _sortColumnIndex,
                        sortAscending: _sortAscending,
                        //onSelectAll: _bancoAgenciaDataSource._selectAll,
                        columns: <DataColumn>[
                          DataColumn(
                            label: const Text('Id'),
                            //tooltip: 'The total amount of food energy in the given serving size.',
                            numeric: true,
                            onSort: (int columnIndex, bool ascending) =>
                                _sort<num>((BancoAgencia bancoAgencia) => bancoAgencia.id, columnIndex, ascending),
                          ),
                          DataColumn(
                            label: const Text('Banco'),
                            onSort: (int columnIndex, bool ascending) =>
                                _sort<String>((BancoAgencia bancoAgencia) => bancoAgencia.banco.nome, columnIndex, ascending),
                          ),
                          DataColumn(
                            label: const Text('Número'),
                            numeric: true,
                            onSort: (int columnIndex, bool ascending) =>
                                _sort<String>((BancoAgencia bancoAgencia) => bancoAgencia.numero, columnIndex, ascending),
                          ),
                          DataColumn(
                            label: const Text('Dígito'),
                            numeric: true,
                            onSort: (int columnIndex, bool ascending) =>
                                _sort<String>((BancoAgencia bancoAgencia) => bancoAgencia.digito, columnIndex, ascending),
                          ),
                          DataColumn(
                            label: const Text('Nome'),
                            numeric: true,
                            onSort: (int columnIndex, bool ascending) =>
                                _sort<String>((BancoAgencia bancoAgencia) => bancoAgencia.nome, columnIndex, ascending),
                          ),
                          DataColumn(
                            label: const Text('Telefone'),
                            numeric: true,
                            onSort: (int columnIndex, bool ascending) =>
                                _sort<String>((BancoAgencia bancoAgencia) => bancoAgencia.telefone, columnIndex, ascending),
                          ),
                          DataColumn(
                            label: const Text('Contato'),
                            numeric: true,
                            onSort: (int columnIndex, bool ascending) =>
                                _sort<String>((BancoAgencia bancoAgencia) => bancoAgencia.contato, columnIndex, ascending),
                          ),
                          DataColumn(
                            label: const Text('Observação'),
                            numeric: true,
                            onSort: (int columnIndex, bool ascending) =>
                                _sort<String>((BancoAgencia bancoAgencia) => bancoAgencia.observacao, columnIndex, ascending),
                          ),
                          DataColumn(
                            label: const Text('Gerente'),
                            numeric: true,
                            onSort: (int columnIndex, bool ascending) =>
                                _sort<String>((BancoAgencia bancoAgencia) => bancoAgencia.gerente, columnIndex, ascending),
                          ),
                        ],
                        source: _bancoAgenciaDataSource,
                      ),
                    ],
                  ),
          ),
        ),
        floatingActionButton: FloatingActionButton(
          backgroundColor: Colors.blueGrey,
          child: Icon(Icons.add),
          onPressed: () {
            Navigator.of(context)
                .push(MaterialPageRoute(
                    builder: (BuildContext context) =>
                        BancoAgenciaPersistePage(bancoAgencia: BancoAgencia(), title: 'BancoAgencia - Inserido', operacao: 'I')))
                .then((_) {
              Provider.of<BancoAgenciaViewModel>(context).consultarLista();
            });
          },
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.endDocked,
        bottomNavigationBar: BottomAppBar(
          color: Colors.black26,
          shape: CircularNotchedRectangle(),
          child: Row(
            children: <Widget>[
              IconButton(
                icon: Icon(Icons.filter),
                onPressed: () async {
                  Filtro filtro = await Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (BuildContext context) => FiltroPage(
                          title: 'Banco Agência - Filtro',
                          colunas: colunas,
                          filtroPadrao: true,
                        ),
                        fullscreenDialog: true,
                      ));
                  if (filtro != null) {
                    if (filtro.campo != null) {
                      filtro.campo = campos[int.parse(filtro.campo)];
                      await Provider.of<BancoAgenciaViewModel>(context).consultarLista(filtro: filtro);
                    }
                  }
                },
              ),
            ],
          ),
        ),
      );
    }
  }

  Future<Null> _refrescaTela() async {
    await Provider.of<BancoAgenciaViewModel>(context).consultarLista();
    return null;
  }
}

/// Código referente a fonte de dados

class BancoAgenciaDataSource extends DataTableSource {
  final List<BancoAgencia> listaBancoAgencia;
  final BuildContext context;

  BancoAgenciaDataSource(this.listaBancoAgencia, this.context);

  void _sort<T>(Comparable<T> getField(BancoAgencia bancoAgencia), bool ascending) {
    listaBancoAgencia.sort((BancoAgencia a, BancoAgencia b) {
      if (!ascending) {
        final BancoAgencia c = a;
        a = b;
        b = c;
      }
      Comparable<T> aValue = getField(a);
      Comparable<T> bValue = getField(b);

      if (aValue == null) aValue = '' as Comparable<T>;
      if (bValue == null) bValue = '' as Comparable<T>;

      return Comparable.compare(aValue, bValue);
    });
    notifyListeners();
  }

  int _selectedCount = 0;

  @override
  DataRow getRow(int index) {
    assert(index >= 0);
    if (index >= listaBancoAgencia.length) return null;
    final BancoAgencia bancoAgencia = listaBancoAgencia[index];
    return DataRow.byIndex(
      index: index,
      cells: <DataCell>[
        DataCell(Text('${bancoAgencia.id ?? ''}'), onTap: () {
          detalharBancoAgencia(bancoAgencia, context);
        }),
        DataCell(Text('${bancoAgencia.banco.nome ?? ''}'), onTap: () {
          detalharBancoAgencia(bancoAgencia, context);
        }),
        DataCell(Text('${bancoAgencia.numero ?? ''}'), onTap: () {
          detalharBancoAgencia(bancoAgencia, context);
        }),
        DataCell(Text('${bancoAgencia.digito ?? ''}'), onTap: () {
          detalharBancoAgencia(bancoAgencia, context);
        }),
        DataCell(Text('${bancoAgencia.nome ?? ''}'), onTap: () {
          detalharBancoAgencia(bancoAgencia, context);
        }),
        DataCell(Text('${bancoAgencia.telefone ?? ''}'), onTap: () {
          detalharBancoAgencia(bancoAgencia, context);
        }),
        DataCell(Text('${bancoAgencia.contato ?? ''}'), onTap: () {
          detalharBancoAgencia(bancoAgencia, context);
        }),
        DataCell(Text('${bancoAgencia.observacao ?? ''}'), onTap: () {
          detalharBancoAgencia(bancoAgencia, context);
        }),
        DataCell(Text('${bancoAgencia.gerente ?? ''}'), onTap: () {
          detalharBancoAgencia(bancoAgencia, context);
        }),
      ],
    );
  }

  @override
  int get rowCount => listaBancoAgencia.length ?? 0;

  @override
  bool get isRowCountApproximate => false;

  @override
  int get selectedRowCount => _selectedCount;

  detalharBancoAgencia(BancoAgencia bancoAgencia, BuildContext context) {
    Navigator.pushNamed(context, '/bancoAgenciaDetalhe', arguments: bancoAgencia);
  }
}
