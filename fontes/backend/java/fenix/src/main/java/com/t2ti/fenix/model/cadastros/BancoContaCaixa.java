package com.t2ti.fenix.model.cadastros;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the banco_conta_caixa database table.
 * 
 */
@Entity
@Table(name="banco_conta_caixa")
@NamedQuery(name="BancoContaCaixa.findAll", query="SELECT b FROM BancoContaCaixa b")
public class BancoContaCaixa implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String descricao;

	private String digito;

	private String nome;

	private String numero;

	private String tipo;

	//bi-directional many-to-one association to BancoAgencia
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="ID_BANCO_AGENCIA")
	private BancoAgencia bancoAgencia;

	public BancoContaCaixa() {
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

	public String getDigito() {
		return this.digito;
	}

	public void setDigito(String digito) {
		this.digito = digito;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getNumero() {
		return this.numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getTipo() {
		return this.tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public BancoAgencia getBancoAgencia() {
		return this.bancoAgencia;
	}

	public void setBancoAgencia(BancoAgencia bancoAgencia) {
		this.bancoAgencia = bancoAgencia;
	}

}