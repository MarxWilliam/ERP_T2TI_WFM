package com.t2ti.fenix.model.cadastros;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the colaborador database table.
 * 
 */
@Entity
@NamedQuery(name="Colaborador.findAll", query="SELECT c FROM Colaborador c")
public class Colaborador implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	//bi-directional many-to-one association to Pessoa
	@JsonIgnore
	@OneToOne
	@JoinColumn(name="ID_PESSOA")
	private Pessoa pessoa;
	
//	//bi-directional many-to-one association to Cargo
//	@ManyToOne
//	@JoinColumn(name="ID_CARGO")
//	private Cargo cargo;

//	//bi-directional many-to-one association to Setor
//	@ManyToOne(mappedBy="colaborador", cascade = CascadeType.ALL, orphanRemoval = true)
//	@JoinColumn(name="ID_SETOR")
//	private Setor setor;	

	@Temporal(TemporalType.DATE)
	@Column(name="DATA_CADASTRO")
	private Date dataCadastro;
	
	@Temporal(TemporalType.DATE)
	@Column(name="DATA_ADMISSAO")
	private Date dataAdmissao;
	
	@Temporal(TemporalType.DATE)
	@Column(name="DATA_DEMISSAO")
	private Date dataDemissao;

	@Column(name="CTPS_NUMERO")
	private String ctpsNumero;

	@Column(name="CTPS_SERIE")
	private String ctpsSerie;

	@Temporal(TemporalType.DATE)
	@Column(name="CTPS_DATA_EXPEDICAO")
	private Date ctpsDataExpedicao;
	
	@Column(name="CTPS_UF")
	private String ctpsUf;

	@Lob
	private String observacao;

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public Date getCtpsDataExpedicao() {
		return this.ctpsDataExpedicao;
	}

	public void setCtpsDataExpedicao(Date ctpsDataExpedicao) {
		this.ctpsDataExpedicao = ctpsDataExpedicao;
	}

	public String getCtpsNumero() {
		return this.ctpsNumero;
	}

	public void setCtpsNumero(String ctpsNumero) {
		this.ctpsNumero = ctpsNumero;
	}
	
	public String getCtpsSerie() {
		return this.ctpsSerie;
	}

	public void setCtpsSerie(String ctpsSerie) {
		this.ctpsSerie = ctpsSerie;
	}

	public String getCtpsUf() {
		return this.ctpsUf;
	}

	public void setCtpsUf(String ctpsUf) {
		this.ctpsUf = ctpsUf;
	}

	public Date getDataAdmissao() {
		return this.dataAdmissao;
	}

	public void setDataAdmissao(Date dataAdmissao) {
		this.dataAdmissao = dataAdmissao;
	}

	public Date getDataCadastro() {
		return this.dataCadastro;
	}

	public void setDataCadastro(Date dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	public Date getDataDemissao() {
		return this.dataDemissao;
	}

	public void setDataDemissao(Date dataDemissao) {
		this.dataDemissao = dataDemissao;
	}

	public String getObservacao() {
		return this.observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

//	public Cargo getCargo() {
//		return this.cargo;
//	}
//
//	public void setCargo(Cargo cargo) {
//		this.cargo = cargo;
//	}

	public Pessoa getPessoa() {
		return this.pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

//	public Setor getSetor() {
//		return this.setor;
//	}
//
//	public void setSetor(Setor setor) {
//		this.setor = setor;
//	}
	
	
}