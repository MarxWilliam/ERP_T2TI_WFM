/*****************************************************************
Title: T2Ti ERP Fenix
Description: Model relacionado a tabela [banco_agencia]
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

import com.t2ti.fenixgerado.model.cadastros.Banco;


/**
 * The persistent class for the BancoAgencia database table.
 * 
 */
@Entity
@Table(name="banco_agencia")
@NamedQuery(name="BancoAgencia.findAll", query="SELECT b FROM BancoAgencia b")
public class BancoAgencia implements Serializable {
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

    @Column(name="TELEFONE")
	private String telefone;

    @Column(name="CONTATO")
	private String contato;

    @Column(name="OBSERVACAO")
	private String observacao;

    @Column(name="GERENTE")
	private String gerente;

     
    //bi-directional many-to-one association to Banco
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="ID_BANCO")
	private Banco banco;


	public BancoAgencia() {
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

    public String getTelefone(){
		return this.telefone;
	}

	public void setTelefone(String telefone){
		this.telefone = telefone;
	}

    public String getContato(){
		return this.contato;
	}

	public void setContato(String contato){
		this.contato = contato;
	}

    public String getObservacao(){
		return this.observacao;
	}

	public void setObservacao(String observacao){
		this.observacao = observacao;
	}

    public String getGerente(){
		return this.gerente;
	}

	public void setGerente(String gerente){
		this.gerente = gerente;
	}

     
    public Banco getBanco() {
		return this.banco;
	}

    public void setBanco(Banco banco) {
		this.banco = banco;
	}

}