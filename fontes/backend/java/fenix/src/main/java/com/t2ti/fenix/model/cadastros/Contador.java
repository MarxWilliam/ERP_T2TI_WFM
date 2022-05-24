package com.t2ti.fenix.model.cadastros;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the contador database table.
 * 
 */
@Entity
@NamedQuery(name="Contador.findAll", query="SELECT c FROM Contador c")
public class Contador implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	//bi-directional many-to-one association to Pessoa
	@JsonIgnore
	@OneToOne
	@JoinColumn(name="ID_PESSOA")
	private Pessoa pessoa;
	
	private String nome;
	
	@Column(name="CRC_INSCRICAO")
	private String crcInscricao;

	@Column(name="CRC_UF")
	private String crcUf;

	
	
	public Contador() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCrcInscricao() {
		return this.crcInscricao;
	}

	public void setCrcInscricao(String crcInscricao) {
		this.crcInscricao = crcInscricao;
	}

	public String getCrcUf() {
		return this.crcUf;
	}

	public void setCrcUf(String crcUf) {
		this.crcUf = crcUf;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Pessoa getPessoa() {
		return this.pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

}