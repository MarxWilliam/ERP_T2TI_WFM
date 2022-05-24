/*****************************************************************
Title: T2Ti ERP Fenix
Description: Model relacionado a tabela [contador]
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
 * The persistent class for the Contador database table.
 * 
 */
@Entity
@Table(name="contador")
@NamedQuery(name="Contador.findAll", query="SELECT c FROM Contador c")
public class Contador implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @Column(name="NOME")
	private String nome;

    @Column(name="CRC_INSCRICAO")
	private String crcInscricao;

    @Column(name="CRC_UF")
	private String crcUf;

     

	public Contador() {
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

    public String getCrcInscricao(){
		return this.crcInscricao;
	}

	public void setCrcInscricao(String crcInscricao){
		this.crcInscricao = crcInscricao;
	}

    public String getCrcUf(){
		return this.crcUf;
	}

	public void setCrcUf(String crcUf){
		this.crcUf = crcUf;
	}

     
}