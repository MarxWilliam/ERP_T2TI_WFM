package com.t2ti.fenix.model.cadastros;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;


/**
 * The persistent class for the estado_civil database table.
 * 
 */
@Entity
@Table(name="estado_civil")
@NamedQuery(name="EstadoCivil.findAll", query="SELECT e FROM EstadoCivil e")
public class EstadoCivil implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String descricao;

	private String nome;

//	//bi-directional many-to-one association to PessoaFisica
//	@OneToMany(mappedBy="estadoCivil")
//	private List<PessoaFisica> pessoaFisicas;

	public EstadoCivil() {
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
//
//	public PessoaFisica addPessoaFisica(PessoaFisica pessoaFisica) {
//		getPessoaFisicas().add(pessoaFisica);
//		pessoaFisica.setEstadoCivil(this);
//
//		return pessoaFisica;
//	}
//
//	public PessoaFisica removePessoaFisica(PessoaFisica pessoaFisica) {
//		getPessoaFisicas().remove(pessoaFisica);
//		pessoaFisica.setEstadoCivil(null);
//
//		return pessoaFisica;
//	}

}