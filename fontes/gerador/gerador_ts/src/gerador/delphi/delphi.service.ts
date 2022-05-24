import * as lodash from 'lodash';
import { Relacionamento } from '../../model/relacionamento.model';
import { idText } from 'typescript';
import { CamposModel } from '../../model/campos.model';

/// classe base que ajuda a gerar o service do Delphi usando o mustache
export class DelphiService {

  uses: string; // armazena as uses que serão inseridas no início da unit
  table: string; // armazena o nome da tabela
  class: string; // armazena o nome da classe
  chamaAnexarObjetosVinculados: string; // permite a chamada do método dentro dos métodos de consulta 
  anexaObjetosVinculadosInterface = []; // armazena o código da interface dos objetos vinculados
  anexaObjetosVinculadosImplementationObjetoAbertura = []; // armazena o código de abertura do método para o objeto
  anexaObjetosVinculadosImplementationObjetoFechamento = []; // armazena o código de fechamento do método para o objeto
  anexaObjetosVinculadosImplementationLista = []; // armazena o código do método para lista
  anexaObjetosVinculados = []; // armazena o código para anexar os objetos vinculados
  linkedListInserir = []; // armazena os objetos que são listas e são usados como variáveis locais no método inserir
  linkedListAlterar = []; // armazena o s objetos que são listas e são usados como variáveis locais no método Alterar
  insereObjetosVinculados = []; // armazena o código de inserção dos objetos vinculados
  alteraObjetosVinculados = []; // armazena o código de Alteração dos objetos vinculados
  excluiFilhos = []; // armazena o código para exclusão dos objetos filhos vinculados 

  relacionamentosDetalhe: Relacionamento[]; // armazena relacionamentos de uma tabela detalhe que serão encontrado aqui no Model

  constructor(tabela: string, dataPacket: CamposModel[], relacionamentos: Relacionamento[]) {
    // nome da classe
    this.class = lodash.camelCase(tabela);
    this.class = lodash.upperFirst(this.class);

    //nome da tabela
    this.table = tabela.toUpperCase();

    this.uses = this.class + ', ';

    for (let i = 0; i < dataPacket.length; i++) {
      // se houver um campo PK e o Side for 'Local' adiciona o objeto da classe pai no relacionamento
      if (dataPacket[i].Field.includes('ID_')) {
        if (dataPacket[i].Comment.includes('Local')) {
          let tabela = lodash.replace(dataPacket[i].Field, 'ID_', '');
          let objeto = new Relacionamento({ tabela: tabela, opcoes: dataPacket[i].Comment });
          if (this.relacionamentosDetalhe == null) {
            this.relacionamentosDetalhe = new Array;
          }
          this.relacionamentosDetalhe.push(objeto);
        }
      }
    }
    // relacionamentos agregados ao mestre
    if (relacionamentos != null) { 
      this.tratarMetodosObjetosVinculados(relacionamentos);
      this.gerarCodigoObjetosVinculados(relacionamentos);
    }
    if (this.relacionamentosDetalhe != null) { 
      this.tratarMetodosObjetosVinculados(this.relacionamentosDetalhe);
      this.gerarCodigoObjetosVinculados(this.relacionamentosDetalhe);
    }
  }
  tratarMetodosObjetosVinculados(relacionamentos: Relacionamento[]) { 
    if (relacionamentos.length > 0) { 
      // permite a chamada ao método
      this.chamaAnexarObjetosVinculados = 'Anexar Objetos Vinculados(Result);';

      // define os métodos anexarObjetosVinculados na interface
      let metodoLista = 'class procedure AnexarObjetosVinculados(const Lista' + this.class + ': TObjectList<T' + this.class + '>); overload;'
      this.anexaObjetosVinculadosInterface.push(metodoLista);
      let metodoObjeto = 'class procedure AnexarObjetosVinculados(const ' + this.class + ': T' + this.class + '); overload;';
      this.anexaObjetosVinculadosInterface.push(metodoObjeto);

      // define os métodos anexarObjetosVinculados na implementation
      let abrirMetodoObjeto = 'class procedure T' + this.class + 'Service.AnexarObjetosVinculados(const ' + this.class + ': T' + this.class + ');\nbegin';
      this.anexaObjetosVinculadosImplementationObjetoAbertura.push(abrirMetodoObjeto);
      this.anexaObjetosVinculadosImplementationObjetoFechamento.push('end;');

      metodoLista = 'class procedure T' + this.class + 'Service.AnexarObjetosVinculados(const Lista' + this.class + ': TObjectList<T' + this.class + '>);\nvar';
      this.anexaObjetosVinculadosImplementationLista.push(metodoLista);
      this.anexaObjetosVinculadosImplementationLista.push('  ' + this.class + ': T' + this.class + ';\nbegin');
      this.anexaObjetosVinculadosImplementationLista.push('  for ' + this.class + ' in Lista' + this.class + ' do');
      this.anexaObjetosVinculadosImplementationLista.push('  begin');
      this.anexaObjetosVinculadosImplementationLista.push('    AnexarObjetosVinculados(' + this.class + '); ');
      this.anexaObjetosVinculadosImplementationLista.push('  end;');
      this.anexaObjetosVinculadosImplementationLista.push('end;');
    }
  }

  gerarCodigoObjetosVinculados(relacionamentos: Relacionamento[]) { 
    for (let i = 0; i < relacionamentos.length; i++) { 
      let tabelaRelacionamento = relacionamentos[i].Tabela.toUpperCase();
      let classeRelacionamento = lodash.camelCase(tabelaRelacionamento);
      classeRelacionamento = lodash.upperFirst(classeRelacionamento);

      // uses 
      this.uses = this.uses + classeRelacionamento + ', ';

      // comentario identificando o relacionamento
      let comentario = '// ' + classeRelacionamento + '\n';

      // começa anexando os objetos/listas vinculados
      let codigoAnexarObjeto = comentario;
      let sql = '';
      if (relacionamentos[i].Side == 'Inverse') {
        sql = "'SELECT * FROM " + tabelaRelacionamento + " WHERE ID_" + this.table + " = ' + " + this.class + ".Id.ToString;";
      } else if (relacionamentos[i].Side == 'Local'){ 
        sql = "'SELECT * FROM " + tabelaRelacionamento + " WHERE ID = ' + " + this.class + ".Id" + classeRelacionamento + ".ToString;"; 
      }
      codigoAnexarObjeto = codigoAnexarObjeto + ' sql := ' + sql + '\n';

      if (relacionamentos[i].Delete) { 
        let codigoExclusao = 'ExcluirFilho(A' + this.class + ".Id, '" + tabelaRelacionamento + "', 'ID_" + this.table + "');";
        this.excluiFilhos.push(codigoExclusao);
      }

      // verifica a cardinalidade para definir o nome do field
      if (relacionamentos[i].Cardinalidade == '@OneToOne') { 
        // anexar objetos vinculados
        let atribuiObjeto = '  ' + this.class + '.' + classeRelacionamento + ' := GetQuery(sql).AsObject<T' + classeRelacionamento + '>;';
        codigoAnexarObjeto = codigoAnexarObjeto + atribuiObjeto + '\n';
        this.anexaObjetosVinculados.push(codigoAnexarObjeto);

        // inserir Objetos Vinculados
        if (relacionamentos[i].Create) { 
          let atribuiId = '  A' + this.class + '.' + classeRelacionamento + '.Id' + this.class + ' := A' + this.class + '.Id;\n';
          let insereBase = '  InserirBase(A' + this.class + '.' + classeRelacionamento + ", '" + tabelaRelacionamento + "');\n";
          this.insereObjetosVinculados.push(comentario + atribuiId + insereBase);
        }

        // alterar objetos vinculados
        if (relacionamentos[i].Update) { 
          let testeIdMaiorZero = '  if A' + this.class + '.' + classeRelacionamento + '.Id > 0 then\n';
          let alteraBase = " AlterarBase(A" + this.class + '.' + classeRelacionamento + ", '" + tabelaRelacionamento + "');\n";
          let seNao = 'else\n  begin\n';
          let atribuiId = '    A' + this.class + '.' + classeRelacionamento + '.Id' + this.class + ' := ' + 'A' + this.class + '.Id;\n';
          let insereBase = "    InserirBase(A" + this.class + '.' + classeRelacionamento + ", '" + tabelaRelacionamento + "');\n";
          let fechaSeNao = '  end;\n';
          this.alteraObjetosVinculados.push(comentario + testeIdMaiorZero + alteraBase + seNao + atribuiId + insereBase + fechaSeNao);
        }
      } else if (relacionamentos[i].Cardinalidade == '@OneToMany') { 
        // anexar listas vinculadas
        let atribuiLista = '  ' + this.class + '.Lista' + classeRelacionamento + ' := GetQuery(sql).AsObjectList<T' + classeRelacionamento + '>;';
        codigoAnexarObjeto = codigoAnexarObjeto + atribuiLista + '\n';
        this.anexaObjetosVinculados.push(codigoAnexarObjeto);

        // define os objetos que são listas - inserção
        if (relacionamentos[i].Create) { 
          if (this.linkedListInserir.length == 0) { 
            this.linkedListInserir.push('var');
          }
          let variavel = '  ' + classeRelacionamento + ' : T' + classeRelacionamento + ';';
          this.linkedListInserir.push(variavel);
        }

        // define os objetos que são listas - alteração
        if (relacionamentos[i].Update) { 
          if (this.linkedListAlterar.length == 0) { 
            this.linkedListAlterar.push('var');
          }
          let variavel = '  ' + classeRelacionamento + ' : T' + classeRelacionamento + ';';
          this.linkedListAlterar.push(variavel);
        }

        // inserir listas vinculadas
        if (relacionamentos[i].Create) { 
          let abreLaco = '  for ' + classeRelacionamento + ' in A' + this.class + '.Lista' + classeRelacionamento + 'do\n';
          abreLaco = abreLaco + '  begin\n';
          let atribuiId = '    ' + classeRelacionamento + '.Id' + this.class + ' := A' + this.class + '.Id;\n';
          let insereBase = '    InserirBase(' + classeRelacionamento + ", '" + tabelaRelacionamento + "');\n";
          let fechaLaco = '  end;\n';
          this.insereObjetosVinculados.push(comentario + abreLaco + atribuiId + insereBase + fechaLaco);
        }

        // alterar listas vinculadas
        if (relacionamentos[i].Update) { 
          let abreLaco = '  for ' + classeRelacionamento + ' in A' + this.class + '.Lista' + classeRelacionamento + 'do\n';
          abreLaco = abreLaco + '  begin\n';
          let testeIdMaiorZero = '    if ' + classeRelacionamento + '.Id > 0 then\n';
          let alteraBase = " AlterarBase(" + classeRelacionamento + ", '" + tabelaRelacionamento + "');\n";
          let seNao = 'else\n  begin\n';
          let atribuiId = '    ' + classeRelacionamento + '.Id' + this.class + ' := ' + 'A' + this.class + '.Id;\n';
          let insereBase = "    InserirBase(" + classeRelacionamento + ", '" + tabelaRelacionamento + "');\n";
          let fechaSeNao = '  end;\n';
          let fechaLaco = '  end;\n';
          this.alteraObjetosVinculados.push(comentario + abreLaco + testeIdMaiorZero + alteraBase + seNao + atribuiId + insereBase + fechaSeNao + fechaLaco);
        }
      }
    }
  }
}