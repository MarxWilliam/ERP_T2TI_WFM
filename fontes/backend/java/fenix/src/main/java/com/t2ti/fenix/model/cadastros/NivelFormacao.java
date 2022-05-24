package com.t2ti.fenix.model.cadastros;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;


/**
 * The persistent class for the nivel_formacao database table.
 * 
 */
@Entity
@Table(name="nivel_formacao")
@NamedQuery(name="NivelFormacao.findAll", query="SELECT n FROM NivelFormacao n")
public class NivelFormacao implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String nome;
	
	private String descricao;



//	//bi-directional many-to-one association to PessoaFisica
//	@OneToMany(mappedBy="nivelFormacao")
//	private List<PessoaFisica> pessoaFisicas;

	public NivelFormacao() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

//	public List<PessoaFisica> getPessoaFisicas() {
//		return this.pessoaFisicas;
//	}
//
//	public void setPessoaFisicas(List<PessoaFisica> pessoaFisicas) {
//		this.pessoaFisicas = pessoaFisicas;
//	}

//	public PessoaFisica addPessoaFisica(PessoaFisica pessoaFisica) {
//		getPessoaFisicas().add(pessoaFisica);
//		pessoaFisica.setNivelFormacao(this);
//
//		return pessoaFisica;
//	}
//
//	public PessoaFisica removePessoaFisica(PessoaFisica pessoaFisica) {
//		getPessoaFisicas().remove(pessoaFisica);
//		pessoaFisica.setNivelFormacao(null);
//
//		return pessoaFisica;
//	}

}