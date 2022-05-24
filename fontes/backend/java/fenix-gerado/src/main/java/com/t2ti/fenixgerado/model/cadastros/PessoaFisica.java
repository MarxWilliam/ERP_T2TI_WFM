/*****************************************************************
Title: T2Ti ERP Fenix
Description: Model relacionado a tabela [pessoa_fisica]
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
import java.util.Date;
import java.util.Date;


/**
 * The persistent class for the PessoaFisica database table.
 * 
 */
@Entity
@Table(name="pessoa_fisica")
@NamedQuery(name="PessoaFisica.findAll", query="SELECT p FROM PessoaFisica p")
public class PessoaFisica implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @JsonIgnore
	@OneToOne
	@JoinColumn(name="ID_PESSOA")
	private Pessoa pessoa;

    @Column(name="CPF")
	private String cpf;

    @Column(name="RG")
	private String rg;

    @Column(name="ORGAO_RG")
	private String orgaoRg;

    @Column(name="DATA_EMISSAO_RG")
	private Date dataEmissaoRg;

    @Column(name="DATA_NASCIMENTO")
	private Date dataNascimento;

    @Column(name="SEXO")
	private String sexo;

    @Column(name="RACA")
	private String raca;

    @Column(name="NACIONALIDADE")
	private String nacionalidade;

    @Column(name="NATURALIDADE")
	private String naturalidade;

    @Column(name="NOME_PAI")
	private String nomePai;

    @Column(name="NOME_MAE")
	private String nomeMae;

     

	public PessoaFisica() {
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

    public String getCpf(){
		return this.cpf;
	}

	public void setCpf(String cpf){
		this.cpf = cpf;
	}

    public String getRg(){
		return this.rg;
	}

	public void setRg(String rg){
		this.rg = rg;
	}

    public String getOrgaoRg(){
		return this.orgaoRg;
	}

	public void setOrgaoRg(String orgaoRg){
		this.orgaoRg = orgaoRg;
	}

    public Date getDataEmissaoRg(){
		return this.dataEmissaoRg;
	}

	public void setDataEmissaoRg(Date dataEmissaoRg){
		this.dataEmissaoRg = dataEmissaoRg;
	}

    public Date getDataNascimento(){
		return this.dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento){
		this.dataNascimento = dataNascimento;
	}

    public String getSexo(){
		return this.sexo;
	}

	public void setSexo(String sexo){
		this.sexo = sexo;
	}

    public String getRaca(){
		return this.raca;
	}

	public void setRaca(String raca){
		this.raca = raca;
	}

    public String getNacionalidade(){
		return this.nacionalidade;
	}

	public void setNacionalidade(String nacionalidade){
		this.nacionalidade = nacionalidade;
	}

    public String getNaturalidade(){
		return this.naturalidade;
	}

	public void setNaturalidade(String naturalidade){
		this.naturalidade = naturalidade;
	}

    public String getNomePai(){
		return this.nomePai;
	}

	public void setNomePai(String nomePai){
		this.nomePai = nomePai;
	}

    public String getNomeMae(){
		return this.nomeMae;
	}

	public void setNomeMae(String nomeMae){
		this.nomeMae = nomeMae;
	}

     
}