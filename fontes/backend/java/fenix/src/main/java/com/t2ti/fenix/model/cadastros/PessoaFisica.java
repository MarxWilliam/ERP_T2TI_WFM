package com.t2ti.fenix.model.cadastros;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;


/**
 * The persistent class for the pessoa_fisica database table.
 * 
 */
@Entity
@Table(name="pessoa_fisica")
@NamedQuery(name="PessoaFisica.findAll", query="SELECT p FROM PessoaFisica p")
public class PessoaFisica implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String cpf;

	@Temporal(TemporalType.DATE)
	@Column(name="DATA_EMISSAO_RG")
	private Date dataEmissaoRg;

	@Temporal(TemporalType.DATE)
	@Column(name="DATA_NASCIMENTO")
	private Date dataNascimento;

	private String nacionalidade;

	private String naturalidade;
	
	@Column(name="NOME_MAE")
	private String nomeMae;

	@Column(name="NOME_PAI")
	private String nomePai;

	@Column(name="ORGAO_RG")
	private String orgaoRg;

	private String raca;

	private String rg;

	private String sexo;

//	//bi-directional many-to-one association to EstadoCivil
//	@ManyToOne
//	@JoinColumn(name="ID_ESTADO_CIVIL")
//	private EstadoCivil estadoCivil;

//	//bi-directional many-to-one association to NivelFormacao
//	@ManyToOne
//	@JoinColumn(name="ID_NIVEL_FORMACAO")
//	private NivelFormacao nivelFormacao;

	//bi-directional many-to-one association to Pessoa
	@JsonIgnore
	@OneToOne
	@JoinColumn(name="ID_PESSOA")
	private Pessoa pessoa;

	public PessoaFisica() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCpf() {
		return this.cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Date getDataEmissaoRg() {
		return this.dataEmissaoRg;
	}

	public void setDataEmissaoRg(Date dataEmissaoRg) {
		this.dataEmissaoRg = dataEmissaoRg;
	}

	public Date getDataNascimento() {
		return this.dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getNacionalidade() {
		return this.nacionalidade;
	}

	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}

	public String getNaturalidade() {
		return this.naturalidade;
	}

	public void setNaturalidade(String naturalidade) {
		this.naturalidade = naturalidade;
	}

	public String getNomeMae() {
		return this.nomeMae;
	}

	public void setNomeMae(String nomeMae) {
		this.nomeMae = nomeMae;
	}

	public String getNomePai() {
		return this.nomePai;
	}

	public void setNomePai(String nomePai) {
		this.nomePai = nomePai;
	}

	public String getOrgaoRg() {
		return this.orgaoRg;
	}

	public void setOrgaoRg(String orgaoRg) {
		this.orgaoRg = orgaoRg;
	}

	public String getRaca() {
		return this.raca;
	}

	public void setRaca(String raca) {
		this.raca = raca;
	}

	public String getRg() {
		return this.rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getSexo() {
		return this.sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

//	public EstadoCivil getEstadoCivil() {
//		return this.estadoCivil;
//	}
//
//	public void setEstadoCivil(EstadoCivil estadoCivil) {
//		this.estadoCivil = estadoCivil;
//	}
//
//	public NivelFormacao getNivelFormacao() {
//		return this.nivelFormacao;
//	}
//
//	public void setNivelFormacao(NivelFormacao nivelFormacao) {
//		this.nivelFormacao = nivelFormacao;
//	}

	public Pessoa getPessoa() {
		return this.pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

}