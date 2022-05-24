/*****************************************************************
Title: T2Ti ERP Fenix
Description: Model relacionado a tabela [colaborador]
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

import java.util.Date;
import java.util.Date;
import java.util.Date;
import java.util.Date;


/**
 * The persistent class for the Colaborador database table.
 * 
 */
@Entity
@Table(name="colaborador")
@NamedQuery(name="Colaborador.findAll", query="SELECT c FROM Colaborador c")
public class Colaborador implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @Column(name="MATRICULA")
	private String matricula;

    @Column(name="DATA_CADASTRO")
	private Date dataCadastro;

    @Column(name="DATA_ADMISSAO")
	private Date dataAdmissao;

    @Column(name="DATA_DEMISSAO")
	private Date dataDemissao;

    @Column(name="CTPS_NUMERO")
	private String ctpsNumero;

    @Column(name="CTPS_SERIE")
	private String ctpsSerie;

    @Column(name="CTPS_DATA_EXPEDICAO")
	private Date ctpsDataExpedicao;

    @Column(name="CTPS_UF")
	private String ctpsUf;

    @Column(name="OBSERVACAO")
	private String observacao;

     

	public Colaborador() {
	}

    public Integer getId(){
		return this.id;
	}

	public void setId(Integer id){
		this.id = id;
	}

    public String getMatricula(){
		return this.matricula;
	}

	public void setMatricula(String matricula){
		this.matricula = matricula;
	}

    public Date getDataCadastro(){
		return this.dataCadastro;
	}

	public void setDataCadastro(Date dataCadastro){
		this.dataCadastro = dataCadastro;
	}

    public Date getDataAdmissao(){
		return this.dataAdmissao;
	}

	public void setDataAdmissao(Date dataAdmissao){
		this.dataAdmissao = dataAdmissao;
	}

    public Date getDataDemissao(){
		return this.dataDemissao;
	}

	public void setDataDemissao(Date dataDemissao){
		this.dataDemissao = dataDemissao;
	}

    public String getCtpsNumero(){
		return this.ctpsNumero;
	}

	public void setCtpsNumero(String ctpsNumero){
		this.ctpsNumero = ctpsNumero;
	}

    public String getCtpsSerie(){
		return this.ctpsSerie;
	}

	public void setCtpsSerie(String ctpsSerie){
		this.ctpsSerie = ctpsSerie;
	}

    public Date getCtpsDataExpedicao(){
		return this.ctpsDataExpedicao;
	}

	public void setCtpsDataExpedicao(Date ctpsDataExpedicao){
		this.ctpsDataExpedicao = ctpsDataExpedicao;
	}

    public String getCtpsUf(){
		return this.ctpsUf;
	}

	public void setCtpsUf(String ctpsUf){
		this.ctpsUf = ctpsUf;
	}

    public String getObservacao(){
		return this.observacao;
	}

	public void setObservacao(String observacao){
		this.observacao = observacao;
	}

     
}