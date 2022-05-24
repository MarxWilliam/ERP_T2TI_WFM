/*****************************************************************
Title: T2Ti ERP Fenix
Description: Model relacionado a tabela [pessoa]
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

import com.t2ti.fenixgerado.model.cadastros.PessoaContato;
import com.t2ti.fenixgerado.model.cadastros.PessoaEndereco;
import com.t2ti.fenixgerado.model.cadastros.PessoaFisica;
import com.t2ti.fenixgerado.model.cadastros.PessoaJuridica;
import com.t2ti.fenixgerado.model.cadastros.PessoaTelefone;


/**
 * The persistent class for the Pessoa database table.
 * 
 */
@Entity
@Table(name="pessoa")
@NamedQuery(name="Pessoa.findAll", query="SELECT p FROM Pessoa p")
public class Pessoa implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @Column(name="NOME")
	private String nome;

    @Column(name="TIPO")
	private String tipo;

    @Column(name="SITE")
	private String site;

    @Column(name="EMAIL")
	private String email;

    @Column(name="CLIENTE")
	private String cliente;

    @Column(name="FORNECEDOR")
	private String fornecedor;

    @Column(name="TRANSPORTADORA")
	private String transportadora;

    @Column(name="COLABORADOR")
	private String colaborador;

    @Column(name="CONTADOR")
	private String contador;

     
    //bi-directional many-to-one association to PessoaFisica
@OneToOne(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
	private PessoaFisica pessoaFisica;

    //bi-directional many-to-one association to PessoaJuridica
@OneToOne(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
	private PessoaJuridica pessoaJuridica;

    //bi-directional many-to-one association to PessoaContato
@OneToMany(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<PessoaContato> listaPessoaContato;

    //bi-directional many-to-one association to PessoaEndereco
@OneToMany(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<PessoaEndereco> listaPessoaEndereco;

    //bi-directional many-to-one association to PessoaTelefone
@OneToMany(mappedBy="pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<PessoaTelefone> listaPessoaTelefone;


	public Pessoa() {
	}

    public Integer getId(){
		return this.id;
	}

	public void setId(Integer id){
		this.id = id;
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

    public String getSite(){
		return this.site;
	}

	public void setSite(String site){
		this.site = site;
	}

    public String getEmail(){
		return this.email;
	}

	public void setEmail(String email){
		this.email = email;
	}

    public String getCliente(){
		return this.cliente;
	}

	public void setCliente(String cliente){
		this.cliente = cliente;
	}

    public String getFornecedor(){
		return this.fornecedor;
	}

	public void setFornecedor(String fornecedor){
		this.fornecedor = fornecedor;
	}

    public String getTransportadora(){
		return this.transportadora;
	}

	public void setTransportadora(String transportadora){
		this.transportadora = transportadora;
	}

    public String getColaborador(){
		return this.colaborador;
	}

	public void setColaborador(String colaborador){
		this.colaborador = colaborador;
	}

    public String getContador(){
		return this.contador;
	}

	public void setContador(String contador){
		this.contador = contador;
	}

     
    public PessoaFisica getPessoaFisica() {
		return this.pessoaFisica;
	}

    public void setPessoaFisica(PessoaFisica pessoaFisica) {
		this.pessoaFisica = pessoaFisica;
	}

    public PessoaJuridica getPessoaJuridica() {
		return this.pessoaJuridica;
	}

    public void setPessoaJuridica(PessoaJuridica pessoaJuridica) {
		this.pessoaJuridica = pessoaJuridica;
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
		for(PessoaEndereco pessoaEndereco : this.listaPessoaEndereco) {
			pessoaEndereco.setPessoa(this);
		}
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