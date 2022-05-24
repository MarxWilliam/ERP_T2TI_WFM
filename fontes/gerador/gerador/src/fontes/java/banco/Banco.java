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
 * The persistent class for the Banco database table.
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
     

	public Banco() {
	}

    public Integer getId(){
		return this.id;
}

public Integer setId(Integer id){
		this.id = id;
}
    public String getCodigo(){
		return this.codigo;
}

public String setCodigo(String codigo){
		this.codigo = codigo;
}
    public String getNome(){
		return this.nome;
}

public String setNome(String nome){
		this.nome = nome;
}
    public String getUrl(){
		return this.url;
}

public String setUrl(String url){
		this.url = url;
}
     
}