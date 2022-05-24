/*****************************************************************
Title: T2Ti ERP Fenix
Description: Model relacionado a tabela [pessoa_endereco]
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

import com.t2ti.fenixgerado.model.cadastros.Pessoa;


/**
 * The persistent class for the PessoaEndereco database table.
 * 
 */
@Entity
@Table(name="pessoa_endereco")
@NamedQuery(name="PessoaEndereco.findAll", query="SELECT p FROM PessoaEndereco p")
public class PessoaEndereco implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @JsonIgnore
	@ManyToOne
	@JoinColumn(name="ID_PESSOA")
	private Pessoa pessoa;

    @Column(name="LOGRADOURO")
	private String logradouro;

    @Column(name="NUMERO")
	private String numero;

    @Column(name="COMPLEMENTO")
	private String complemento;

    @Column(name="BAIRRO")
	private String bairro;

    @Column(name="CIDADE")
	private String cidade;

    @Column(name="UF")
	private String uf;

    @Column(name="CEP")
	private String cep;

    @Column(name="MUNICIPIO_IBGE")
	private Integer municipioIbge;

    @Column(name="PRINCIPAL")
	private String principal;

    @Column(name="ENTREGA")
	private String entrega;

    @Column(name="COBRANCA")
	private String cobranca;

    @Column(name="CORRESPONDENCIA")
	private String correspondencia;

     

	public PessoaEndereco() {
	}

    public Integer getId(){
		return this.id;
	}

	public void setId(Integer id){
		this.id = id;
	}

    	public Pessoa getPessoa(){
				return this.pessoa;
	}

	public void setPessoa(Pessoa pessoa){
		this.pessoa = pessoa;
	}

    public String getLogradouro(){
		return this.logradouro;
	}

	public void setLogradouro(String logradouro){
		this.logradouro = logradouro;
	}

    public String getNumero(){
		return this.numero;
	}

	public void setNumero(String numero){
		this.numero = numero;
	}

    public String getComplemento(){
		return this.complemento;
	}

	public void setComplemento(String complemento){
		this.complemento = complemento;
	}

    public String getBairro(){
		return this.bairro;
	}

	public void setBairro(String bairro){
		this.bairro = bairro;
	}

    public String getCidade(){
		return this.cidade;
	}

	public void setCidade(String cidade){
		this.cidade = cidade;
	}

    public String getUf(){
		return this.uf;
	}

	public void setUf(String uf){
		this.uf = uf;
	}

    public String getCep(){
		return this.cep;
	}

	public void setCep(String cep){
		this.cep = cep;
	}

    public Integer getMunicipioIbge(){
		return this.municipioIbge;
	}

	public void setMunicipioIbge(Integer municipioIbge){
		this.municipioIbge = municipioIbge;
	}

    public String getPrincipal(){
		return this.principal;
	}

	public void setPrincipal(String principal){
		this.principal = principal;
	}

    public String getEntrega(){
		return this.entrega;
	}

	public void setEntrega(String entrega){
		this.entrega = entrega;
	}

    public String getCobranca(){
		return this.cobranca;
	}

	public void setCobranca(String cobranca){
		this.cobranca = cobranca;
	}

    public String getCorrespondencia(){
		return this.correspondencia;
	}

	public void setCorrespondencia(String correspondencia){
		this.correspondencia = correspondencia;
	}

     
}