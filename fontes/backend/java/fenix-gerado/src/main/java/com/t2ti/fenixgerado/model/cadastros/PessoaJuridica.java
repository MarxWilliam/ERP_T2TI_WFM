/*****************************************************************
Title: T2Ti ERP Fenix
Description: Model relacionado a tabela [pessoa_juridica]
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


/**
 * The persistent class for the PessoaJuridica database table.
 * 
 */
@Entity
@Table(name="pessoa_juridica")
@NamedQuery(name="PessoaJuridica.findAll", query="SELECT p FROM PessoaJuridica p")
public class PessoaJuridica implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @JsonIgnore
	@OneToOne
	@JoinColumn(name="ID_PESSOA")
	private Pessoa pessoa;

    @Column(name="CNPJ")
	private String cnpj;

    @Column(name="NOME_FANTASIA")
	private String nomeFantasia;

    @Column(name="INSCRICAO_ESTADUAL")
	private String inscricaoEstadual;

    @Column(name="INSCRICAO_MUNICIPAL")
	private String inscricaoMunicipal;

    @Column(name="DATA_CONSTITUICAO")
	private Date dataConstituicao;

    @Column(name="TIPO_REGIME")
	private String tipoRegime;

    @Column(name="CRT")
	private String crt;

     

	public PessoaJuridica() {
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

    public String getCnpj(){
		return this.cnpj;
	}

	public void setCnpj(String cnpj){
		this.cnpj = cnpj;
	}

    public String getNomeFantasia(){
		return this.nomeFantasia;
	}

	public void setNomeFantasia(String nomeFantasia){
		this.nomeFantasia = nomeFantasia;
	}

    public String getInscricaoEstadual(){
		return this.inscricaoEstadual;
	}

	public void setInscricaoEstadual(String inscricaoEstadual){
		this.inscricaoEstadual = inscricaoEstadual;
	}

    public String getInscricaoMunicipal(){
		return this.inscricaoMunicipal;
	}

	public void setInscricaoMunicipal(String inscricaoMunicipal){
		this.inscricaoMunicipal = inscricaoMunicipal;
	}

    public Date getDataConstituicao(){
		return this.dataConstituicao;
	}

	public void setDataConstituicao(Date dataConstituicao){
		this.dataConstituicao = dataConstituicao;
	}

    public String getTipoRegime(){
		return this.tipoRegime;
	}

	public void setTipoRegime(String tipoRegime){
		this.tipoRegime = tipoRegime;
	}

    public String getCrt(){
		return this.crt;
	}

	public void setCrt(String crt){
		this.crt = crt;
	}

     
}