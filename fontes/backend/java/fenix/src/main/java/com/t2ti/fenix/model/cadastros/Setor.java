package com.t2ti.fenix.model.cadastros;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQuery;


/**
 * The persistent class for the setor database table.
 * 
 */
@Entity
@NamedQuery(name="Setor.findAll", query="SELECT s FROM Setor s")
public class Setor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Lob
	private String descricao;

	private String nome;


//	//bi-directional many-to-one association to Colaborador
//	@JsonIgnore
//	@OneToMany(mappedBy="setor")
//	private List<Colaborador> colaboradors;

	public Setor() {
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

//	public List<Colaborador> getColaboradors() {
//		return this.colaboradors;
//	}
//
//	public void setColaboradors(List<Colaborador> colaboradors) {
//		this.colaboradors = colaboradors;
//	}
//
//	public Colaborador addColaborador(Colaborador colaborador) {
//		getColaboradors().add(colaborador);
//		colaborador.setSetor(this);
//
//		return colaborador;
//	}
//
//	public Colaborador removeColaborador(Colaborador colaborador) {
//		getColaboradors().remove(colaborador);
//		colaborador.setSetor(null);
//
//		return colaborador;
//	}

}