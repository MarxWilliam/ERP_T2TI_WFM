/*****************************************************************
Title: T2Ti ERP Fenix
Description: Model relacionado a tabela []
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

package com.t2ti.fenix.model.cadastros;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

/**
 * The persistent class for the pessoa database table.
 * 
 */
@Entity
@NamedQuery(name="Pessoa.findAll", query="SELECT p FROM Pessoa p")
public class Pessoa implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String nome;
	private String tipo;
	private String site;
	private String email;
	private String cliente;
	private String colaborador;
	private String fornecedor;
	private String transportadora;
	private String contador;

	//bi-directional many-to-one association to PessoaContato
	@OneToMany(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<PessoaContato> listaPessoaContato;

	//bi-directional many-to-one association to PessoaEndereco
	@OneToMany(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<PessoaEndereco> listaPessoaEndereco;

	//bi-directional many-to-one association to PessoaFisica
	@OneToOne(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
	private PessoaFisica pessoaFisica;
	
	@OneToOne(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
	private PessoaJuridica pessoaJuridica;

	//bi-directional many-to-one association to PessoaTelefone
	@OneToMany(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<PessoaTelefone> listaPessoaTelefone;

	public Pessoa() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCliente() {
		return this.cliente;
	}

	public void setCliente(String cliente) {
		this.cliente = cliente;
	}

	public String getColaborador() {
		return this.colaborador;
	}

	public void setColaborador(String colaborador) {
		this.colaborador = colaborador;
	}

	public String getContador() {
		return this.contador;
	}

	public void setContador(String contador) {
		this.contador = contador;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFornecedor() {
		return this.fornecedor;
	}

	public void setFornecedor(String fornecedor) {
		this.fornecedor = fornecedor;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSite() {
		return this.site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public String getTipo() {
		return this.tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getTransportadora() {
		return this.transportadora;
	}

	public void setTransportadora(String transportadora) {
		this.transportadora = transportadora;
	}

	public Set<PessoaContato> getListaPessoaContato() {
		return this.listaPessoaContato;
	}

	public void setListaPessoaContato(Set<PessoaContato> listaPessoaContato) {
		this.listaPessoaContato = listaPessoaContato;
		for(PessoaContato pessoaContato : this.listaPessoaContato) {
			pessoaContato.setPessoa(this);
		}
	}

	public Set<PessoaEndereco> getListaPessoaEndereco() {
		return this.listaPessoaEndereco;
	}

	public void setListaPessoaEndereco(Set<PessoaEndereco> listaPessoaEndereco) {
		this.listaPessoaEndereco = listaPessoaEndereco;
		for(PessoaEndereco pessoaEndereco:this.listaPessoaEndereco) {
			pessoaEndereco.setPessoa(this);
		}
	}

	public PessoaFisica getPessoaFisica() {
		return this.pessoaFisica;
	}

	public void setPessoaFisica(PessoaFisica pessoaFisica) {
		this.pessoaFisica = pessoaFisica;
		this.pessoaFisica.setPessoa(this);
	}

	public PessoaJuridica getPessoaJuridica() {
		return this.pessoaJuridica;
	}

	public void setPessoaJuridica(PessoaJuridica pessoaJuridica) {
		this.pessoaJuridica = pessoaJuridica;
		this.pessoaJuridica.setPessoa(this);
	}

	public Set<PessoaTelefone> getListaPessoaTelefone() {
		return this.listaPessoaTelefone;
	}

	public void setListaPessoaTelefone(Set<PessoaTelefone> listaPessoaTelefone) {
		this.listaPessoaTelefone = listaPessoaTelefone;
		for(PessoaTelefone pessoaTelefone : this.listaPessoaTelefone) {
			pessoaTelefone.setPessoa(this);
		}
	}

}