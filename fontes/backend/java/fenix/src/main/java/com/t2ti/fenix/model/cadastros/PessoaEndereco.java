package com.t2ti.fenix.model.cadastros;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the pessoa_endereco database table.
 * 
 */
@Entity
@Table(name="pessoa_endereco")
@NamedQuery(name="PessoaEndereco.findAll", query="SELECT p FROM PessoaEndereco p")
public class PessoaEndereco implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	//bi-directional many-to-one association to Pessoa
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="ID_PESSOA")
	private Pessoa pessoa;
	
	private String logradouro;
	
	private String numero;
	
	private String complemento;
	
	private String bairro;

	private String cidade;
	

	private String uf;
	
	private String cep;

	@Column(name="MUNICIPIO_IBGE")
	private Integer municipioIbge;
	
	private String principal;
	
	private String entrega;
	
	private String cobranca;

	private String correspondencia;


	public PessoaEndereco() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBairro() {
		return this.bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCep() {
		return this.cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getCidade() {
		return this.cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getCobranca() {
		return this.cobranca;
	}

	public void setCobranca(String cobranca) {
		this.cobranca = cobranca;
	}

	public String getComplemento() {
		return this.complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getCorrespondencia() {
		return this.correspondencia;
	}

	public void setCorrespondencia(String correspondencia) {
		this.correspondencia = correspondencia;
	}

	public String getEntrega() {
		return this.entrega;
	}

	public void setEntrega(String entrega) {
		this.entrega = entrega;
	}

	public String getLogradouro() {
		return this.logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public Integer getMunicipioIbge() {
		return this.municipioIbge;
	}

	public void setMunicipioIbge(Integer municipioIbge) {
		this.municipioIbge = municipioIbge;
	}

	public String getNumero() {
		return this.numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getPrincipal() {
		return this.principal;
	}

	public void setPrincipal(String principal) {
		this.principal = principal;
	}

	public String getUf() {
		return this.uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public Pessoa getPessoa() {
		return this.pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

}