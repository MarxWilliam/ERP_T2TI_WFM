package com.t2ti.fenix.model.cadastros;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;


/**
 * The persistent class for the pessoa_juridica database table.
 * 
 */
@Entity
@Table(name="pessoa_juridica")
@NamedQuery(name="PessoaJuridica.findAll", query="SELECT pj FROM PessoaJuridica pj")
public class PessoaJuridica implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String cnpj;

	private String crt;

	@Temporal(TemporalType.DATE)
	@Column(name="DATA_CONSTITUICAO")
	private Date dataConstituicao;

	@Column(name="INSCRICAO_ESTADUAL")
	private String inscricaoEstadual;

	@Column(name="INSCRICAO_MUNICIPAL")
	private String inscricaoMunicipal;

	@Column(name="NOME_FANTASIA")
	private String nomeFantasia;

	@Column(name="TIPO_REGIME")
	private String tipoRegime;

	//bi-directional many-to-one association to Pessoa
	
	@OneToOne 
	@JsonIgnore
	@JoinColumn(name="ID_PESSOA")
	private Pessoa pessoa;

	public PessoaJuridica() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCnpj() {
		return this.cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getCrt() {
		return this.crt;
	}

	public void setCrt(String crt) {
		this.crt = crt;
	}

	public Date getDataConstituicao() {
		return this.dataConstituicao;
	}

	public void setDataConstituicao(Date dataConstituicao) {
		this.dataConstituicao = dataConstituicao;
	}

	public String getInscricaoEstadual() {
		return this.inscricaoEstadual;
	}

	public void setInscricaoEstadual(String inscricaoEstadual) {
		this.inscricaoEstadual = inscricaoEstadual;
	}

	public String getInscricaoMunicipal() {
		return this.inscricaoMunicipal;
	}

	public void setInscricaoMunicipal(String inscricaoMunicipal) {
		this.inscricaoMunicipal = inscricaoMunicipal;
	}

	public String getNomeFantasia() {
		return this.nomeFantasia;
	}

	public void setNomeFantasia(String nomeFantasia) {
		this.nomeFantasia = nomeFantasia;
	}

	public String getTipoRegime() {
		return this.tipoRegime;
	}

	public void setTipoRegime(String tipoRegime) {
		this.tipoRegime = tipoRegime;
	}

	public Pessoa getPessoa() {
		return this.pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

}