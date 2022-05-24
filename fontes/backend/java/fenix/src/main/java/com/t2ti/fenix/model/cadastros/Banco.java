package com.t2ti.fenix.model.cadastros;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the banco database table.
 * 
 */
@Entity
@NamedQuery(name="Banco.findAll", query="SELECT b FROM Banco b")
public class Banco implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String codigo;

	private String nome;

	private String url;


//
//	//bi-directional many-to-one association to BancoAgencia
//	@JsonIgnore
//	@OneToMany(mappedBy="banco", cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<BancoAgencia> bancoAgencias;

	public Banco() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCodigo() {
		return this.codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

//	public List<BancoAgencia> getBancoAgencias() {
//		return this.bancoAgencias;
//	}
//
//	public void setBancoAgencias(List<BancoAgencia> bancoAgencias) {
//		this.bancoAgencias = bancoAgencias;
//		for(BancoAgencia bancoAgencia : this.bancoAgencias) {
//			bancoAgencia.setBanco(this);
//		}
//	}
//
//	public BancoAgencia addBancoAgencia(BancoAgencia bancoAgencia) {
//		getBancoAgencias().add(bancoAgencia);
//		bancoAgencia.setBanco(this);
//
//		return bancoAgencia;
//	}
//
//	public BancoAgencia removeBancoAgencia(BancoAgencia bancoAgencia) {
//		getBancoAgencias().remove(bancoAgencia);
//		bancoAgencia.setBanco(null);
//
//		return bancoAgencia;
//	}

}