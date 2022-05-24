/*****************************************************************
Title: T2Ti ERP Fenix
Description: Model relacionado a tabela [pessoa_telefone]
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
 * The persistent class for the PessoaTelefone database table.
 * 
 */
@Entity
@Table(name="pessoa_telefone")
@NamedQuery(name="PessoaTelefone.findAll", query="SELECT p FROM PessoaTelefone p")
public class PessoaTelefone implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @JsonIgnore
	@ManyToOne
	@JoinColumn(name="ID_PESSOA")
	private Pessoa pessoa;

    @Column(name="TIPO")
	private String tipo;

    @Column(name="NUMERO")
	private String numero;

     

	public PessoaTelefone() {
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

    public String getTipo(){
		return this.tipo;
	}

	public void setTipo(String tipo){
		this.tipo = tipo;
	}

    public String getNumero(){
		return this.numero;
	}

	public void setNumero(String numero){
		this.numero = numero;
	}

     
}