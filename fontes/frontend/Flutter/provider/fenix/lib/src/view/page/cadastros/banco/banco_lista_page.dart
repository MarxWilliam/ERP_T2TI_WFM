import 'package:fenix/src/model/cadastros/banco.dart';
import 'package:fenix/src/model/filtro.dart';
import 'package:fenix/src/view/page/cadastros/banco/banco_persiste_page.dart';
import 'package:fenix/src/view/shared/erro_page.dart';
import 'package:fenix/src/view/shared/filtro_page.dart';
import 'package:fenix/src/view_model/banco_view_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class BancoListaPage extends StatefulWidget {
  @override
  _BancoListaPageState createState() => _BancoListaPageState();
}

class _BancoListaPageState extends State<BancoListaPage> {
  int _rowsPerPage = PaginatedDataTable.defaultRowsPerPage;
  int _sortColumnIndex;
  bool _sortAscending = true;

  @override
  Widget build(BuildContext context) {
    var listaBanco = Provider.of<BancoViewModel>(context).listaBanco;
    var colunas = Banco.colunas;
    var campos = Banco.campos;

    final BancoDataSource _bancoDataSource = BancoDataSource(listaBanco, context);

    void _sort<T>(Comparable<T> getField(Banco banco), int columnIndex, bool ascending) {
      _bancoDataSource._sort<T>(getField, ascending);
      setState(() {
        _sortColumnIndex = columnIndex;
        _sortAscending = ascending;
      });
    }

    if (Provider.of<BancoViewModel>(context).objetoJsonErro != null) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Cadastro - Banco'),
          actions: <Widget>[],
        ),
        body: ErroPage(
          objetoJsonErro: Provider.of<BancoViewModel>(context).objetoJsonErro, //ErrorPage
        ),
      );
    } else {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Cadastro - Banco'),
          actions: <Widget>[],
        ),
        body: RefreshIndicator(
          onRefresh: _refrescaTela,
          child: Scrollbar(
            child: listaBanco == null
                ? Center(
                    child: Provider.of<BancoViewModel>(context).objetoJsonErro == null
                        ? Center(
                            child: CircularProgressIndicator(),
                          )
                        : ErroPage(
                            objetoJsonErro: Provider.of<BancoViewModel>(context).objetoJsonErro,
                          ),
                  )
                : ListView(
                    padding: const EdgeInsets.all(8.0),
                    children: <Widget>[
                      PaginatedDataTable(
                        header: const Text('Relação de Bancos'),
                        rowsPerPage: _rowsPerPage,
                        onRowsPerPageChanged: (int value) {
                          setState(() {
                            _rowsPerPage = value;
                          });
                        },
                        sortColumnIndex: _sortColumnIndex,
                        sortAscending: _sortAscending,
                        //onSelectAll: _bancoDataSource._selectAll,
                        columns: <DataColumn>[
                          DataColumn(
                            label: const Text('Id'),
                            numeric: true,
                            onSort: (int columnIndex, bool ascending) => _sort<num>((Banco banco) => banco.id, columnIndex, ascending),
                          ),
                          DataColumn(
                            label: const Text('Código'),
                            onSort: (int columnIndex, bool ascending) => _sort<String>((Banco banco) => banco.codigo, columnIndex, ascending),
                          ),
                          DataColumn(
                            label: const Text('Nome'),
                            numeric: true,
                            onSort: (int columnIndex, bool ascending) => _sort<String>((Banco banco) => banco.nome, columnIndex, ascending),
                          ),
                          DataColumn(
                            label: const Text('URL'),
                            numeric: true,
                            onSort: (int columnIndex, bool ascending) => _sort<String>((Banco banco) => banco.url, columnIndex, ascending),
                          ),
                        ],
                        source: _bancoDataSource,
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
                    builder: (BuildContext context) => BancoPersistePage(banco: Banco(), title: 'Banco - Inserido', operacao: 'I')))
                .then((_) {
              Provider.of<BancoViewModel>(context).consultarLista();
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
                          title: 'Banco - Filtro',
                          colunas: colunas,
                          filtroPadrao: true,
                        ),
                        fullscreenDialog: true,
                      ));
                  if (filtro != null) {
                    if (filtro.campo != null) {
                      filtro.campo = campos[int.parse(filtro.campo)];
                      await Provider.of<BancoViewModel>(context).consultarLista(filtro: filtro);
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
    await Provider.of<BancoViewModel>(context).consultarLista();
    return null;
  }
}

/// Código referente a fonte de dados

class BancoDataSource extends DataTableSource {
  final List<Banco> listaBanco;
  final BuildContext context;

  BancoDataSource(this.listaBanco, this.context);

  void _sort<T>(Comparable<T> getField(Banco banco), bool ascending) {
    listaBanco.sort((Banco a, Banco b) {
      if (!ascending) {
        final Banco c = a;
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
    if (index >= listaBanco.length) return null;
    final Banco banco = listaBanco[index];
    return DataRow.byIndex(
      index: index,
      cells: <DataCell>[
        DataCell(Text('${banco.id ?? ''}'), onTap: () {
          detalharBanco(banco, context);
        }),
        DataCell(Text('${banco.codigo ?? ''}'), onTap: () {
          detalharBanco(banco, context);
        }),
        DataCell(Text('${banco.nome ?? ''}'), onTap: () {
          detalharBanco(banco, context);
        }),
        DataCell(Text('${banco.url ?? ''}'), onTap: () {
          detalharBanco(banco, context);
        }),
      ],
    );
  }

  @override
  int get rowCount => listaBanco.length ?? 0;

  @override
  bool get isRowCountApproximate => false;

  @override
  int get selectedRowCount => _selectedCount;

  detalharBanco(Banco banco, BuildContext context) {
    Navigator.pushNamed(context, '/bancoDetalhe', arguments: banco);
  }
}
