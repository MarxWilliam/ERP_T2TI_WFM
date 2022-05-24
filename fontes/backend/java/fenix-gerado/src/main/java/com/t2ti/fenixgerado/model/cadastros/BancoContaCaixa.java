/*****************************************************************
Title: T2Ti ERP Fenix
Description: Model relacionado a tabela [banco_conta_caixa]
License: Apache2
Copyright: Copyright 2020 (C) William Marx

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

      The author may be contacted at:
          marxwilliamf@gmail.com

@Author: William Felipe Marx (marxwilliamf@gmail.com)
@version: 1.0.0
*****************************************************************/

package com.t2ti.fenixgerado.model.cadastros;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the BancoContaCaixa database table.
 * 
 */
@Entity
@Table(name="banco_conta_caixa")
@NamedQuery(name="BancoContaCaixa.findAll", query="SELECT b FROM BancoContaCaixa b")
public class BancoContaCaixa implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @Column(name="NUMERO")
	private String numero;

    @Column(name="DIGITO")
	private String digito;

    @Column(name="NOME")
	private String nome;

    @Column(name="TIPO")
	private String tipo;

    @Column(name="DESCRICAO")
	private String descricao;

     

	public BancoContaCaixa() {
	}

    public Integer getId(){
		return this.id;
	}

	public void setId(Integer id){
		this.id = id;
	}

    public String getNumero(){
		return this.numero;
	}

	public void setNumero(String numero){
		this.numero = numero;
	}

    public String getDigito(){
		return this.digito;
	}

	public void setDigito(String digito){
		this.digito = digito;
	}

    public String getNome(){
		return this.nome;
	}

	public void setNome(String nome){
		this.nome = nome;
	}

    public String getTipo(){
		return this.tipo;
	}

	public void setTipo(String tipo){
		this.tipo = tipo;
	}

    public String getDescricao(){
		return this.descricao;
	}

	public void setDescricao(String descricao){
		this.descricao = descricao;
	}

     
}