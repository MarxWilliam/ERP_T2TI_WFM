package com.t2ti.fenix.model.cadastros;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the banco_agencia database table.
 * 
 */
@Entity
@Table(name="banco_agencia")
@NamedQuery(name="BancoAgencia.findAll", query="SELECT b FROM BancoAgencia b")
public class BancoAgencia implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String numero;
	
	private String digito;

	private String nome;

	private String telefone;
	
	private String contato;
	
	private String observacao;
	
	private String gerente;


	//bi-directional many-to-one association to BancoAgencia
	//@JsonIgnore
	@ManyToOne
	@JoinColumn(name="ID_BANCO")
	private Banco banco;

	//bi-directional many-to-one association to BancoContaCaixa
	//@OneToMany //(mappedBy="bancoAgencia", cascade = CascadeType.ALL, orphanRemoval = true)
	//private List<BancoContaCaixa> bancoContaCaixas;

	public BancoAgencia() {
	}

	public int getId() {
		return this.id;
	}

	public String getContato() {
		return this.contato;
	}

	public void setContato(String contato) {
		this.contato = contato;
	}

	public String getDigito() {
		return this.digito;
	}

	public void setDigito(String digito) {
		this.digito = digito;
	}

	public String getGerente() {
		return this.gerente;
	}

	public void setGerente(String gerente) {
		this.gerente = gerente;
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

	public String getObservacao() {
		return this.observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	public String getTelefone() {
		return this.telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public Banco getBanco() {
		return this.banco;
	}

	public void setBanco(Banco banco) {
		this.banco = banco;
	}

//	public List<BancoContaCaixa> getBancoContaCaixas() {
//		return this.bancoContaCaixas;
//	}
//
//	public void setBancoContaCaixas(List<BancoContaCaixa> bancoContaCaixas) {
//		this.bancoContaCaixas = bancoContaCaixas;
//		for(BancoContaCaixa bancoContaCaixa : this.bancoContaCaixas) {
//			bancoContaCaixa.setBancoAgencia(this);
//		}
//	}

//	public BancoContaCaixa addBancoContaCaixa(BancoContaCaixa bancoContaCaixa) {
//		getBancoContaCaixas().add(bancoContaCaixa);
//		bancoContaCaixa.setBancoAgencia(this);
//
//		return bancoContaCaixa;
//	}
//
//	public BancoContaCaixa removeBancoContaCaixa(BancoContaCaixa bancoContaCaixa) {
//		getBancoContaCaixas().remove(bancoContaCaixa);
//		bancoContaCaixa.setBancoAgencia(null);
//
//		return bancoContaCaixa;
//	}

}