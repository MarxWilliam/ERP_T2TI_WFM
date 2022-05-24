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
 * The persistent class for the Cargo database table.
 * 
 */
@Entity
@NamedQuery(name="Cargo.findAll", query="SELECT c FROM Cargo c")
public class Cargo implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
    private String nome;
    private String descricao;
    private decimal(18,6) salario;
    private String cbo_1994;
    private String cbo_2002;
     

	public Cargo() {
	}

    public Integer getId(){
		return this.id;
}

public Integer setId(Integer id){
		this.id = id;
}
    public String getNome(){
		return this.nome;
}

public String setNome(String nome){
		this.nome = nome;
}
    public String getDescricao(){
		return this.descricao;
}

public String setDescricao(String descricao){
		this.descricao = descricao;
}
    public decimal(18,6) getSalario(){
		return this.salario;
}

public decimal(18,6) setSalario(decimal(18,6) salario){
		this.salario = salario;
}
    public String getCbo_1994(){
		return this.cbo_1994;
}

public String setCbo_1994(String cbo_1994){
		this.cbo_1994 = cbo_1994;
}
    public String getCbo_2002(){
		return this.cbo_2002;
}

public String setCbo_2002(String cbo_2002){
		this.cbo_2002 = cbo_2002;
}
     
}