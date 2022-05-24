package com.t2ti.fenix.model.cadastros;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the papel database table.
 * 
 */
@Entity
@NamedQuery(name="Papel.findAll", query="SELECT p FROM Papel p")
public class Papel implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name="ACESSO_COMPLETO")
	private String acessoCompleto;

	@Lob
	private String descricao;

	private String nome;

//	//bi-directional many-to-one association to Usuario
//	@OneToMany(mappedBy="papel")
//	private List<Usuario> usuarios;

	public Papel() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAcessoCompleto() {
		return this.acessoCompleto;
	}

	public void setAcessoCompleto(String acessoCompleto) {
		this.acessoCompleto = acessoCompleto;
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

//
//	public List<Usuario> getUsuarios() {
//		return this.usuarios;
//	}
//
//	public void setUsuarios(List<Usuario> usuarios) {
//		this.usuarios = usuarios;
//	}
//
//	public Usuario addUsuario(Usuario usuario) {
//		getUsuarios().add(usuario);
//		usuario.setPapel(this);
//
//		return usuario;
//	}
//
//	public Usuario removeUsuario(Usuario usuario) {
//		getUsuarios().remove(usuario);
//		usuario.setPapel(null);
//
//		return usuario;
//	}

}
