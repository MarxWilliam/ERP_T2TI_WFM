/*****************************************************************
Title: T2Ti ERP Fenix
Description: Model relacionado a tabela [cliente]
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


/**
 * The persistent class for the Cliente database table.
 * 
 */
@Entity
@Table(name="cliente")
@NamedQuery(name="Cliente.findAll", query="SELECT c FROM Cliente c")
public class Cliente implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @Column(name="DESDE")
	private Date desde;

    @Column(name="DATA_CADASTRO")
	private Date dataCadastro;

    @Column(name="TAXA_DESCONTO")
	private double taxaDesconto;

    @Column(name="LIMITE_CREDITO")
	private double limiteCredito;

    @Column(name="OBSERVACAO")
	private String observacao;

     

	public Cliente() {
	}

    public Integer getId(){
		return this.id;
	}

	public void setId(Integer id){
		this.id = id;
	}

    public Date getDesde(){
		return this.desde;
	}

	public void setDesde(Date desde){
		this.desde = desde;
	}

    public Date getDataCadastro(){
		return this.dataCadastro;
	}

	public void setDataCadastro(Date dataCadastro){
		this.dataCadastro = dataCadastro;
	}

    public double getTaxaDesconto(){
		return this.taxaDesconto;
	}

	public void setTaxaDesconto(double taxaDesconto){
		this.taxaDesconto = taxaDesconto;
	}

    public double getLimiteCredito(){
		return this.limiteCredito;
	}

	public void setLimiteCredito(double limiteCredito){
		this.limiteCredito = limiteCredito;
	}

    public String getObservacao(){
		return this.observacao;
	}

	public void setObservacao(String observacao){
		this.observacao = observacao;
	}

     
}