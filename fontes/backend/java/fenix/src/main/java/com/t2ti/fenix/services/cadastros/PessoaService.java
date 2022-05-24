package com.t2ti.fenix.services.cadastros;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.t2ti.fenix.model.cadastros.Banco;
import com.t2ti.fenix.model.cadastros.Pessoa;
import com.t2ti.fenix.model.transiente.Filtro;
import com.t2ti.fenix.repository.cadastros.PessoaRepository;

@Service
public class PessoaService {

	@Autowired
	private PessoaRepository repository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	public List<Pessoa> consultarLista(){
		return repository.findAll();
	}
	
	public List<Pessoa> consultarLista(Filtro filtro){
		String sql = "SELECT * FROM PESSOA WHERE " + filtro.getWhere();
		Query query = entityManager.createNativeQuery(sql, Pessoa.class);
		List<Pessoa> lista = (List<Pessoa>) query.getResultList();
		return lista;
	}
	
	public Pessoa consultarObjeto(Integer id){
		return repository.findById(id).get();
	}
	
	public Pessoa salvar(Pessoa pessoa) {
		return repository.save(pessoa);
	}
	
	public void excluir(Integer id) {
		Pessoa pessoa = consultarObjeto(id);
		repository.delete(pessoa);
	}
}
