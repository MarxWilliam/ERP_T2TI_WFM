package com.t2ti.fenix.services.cadastros;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.t2ti.fenix.model.cadastros.Banco;
import com.t2ti.fenix.model.transiente.Filtro;
import com.t2ti.fenix.repository.cadastros.BancoRepository;

@Service
public class BancoService {

	@Autowired
	private BancoRepository repository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	public List<Banco> consultarLista(){
		return repository.findAll();
	}
	
	public List<Banco> consultarLista(Filtro filtro){
		String sql = "SELECT * from BANCO WHERE " + filtro.getWhere();
		Query query = entityManager.createNativeQuery(sql, Banco.class);
		List<Banco> lista = (List<Banco>) query.getResultList();
		return lista;
//		BancoSpecification especificacao = new BancoSpecification(filtro);
//		return repository.findAll(especificacao);
	}
	
	public Banco consultarObjeto(Integer id){
		return repository.findById(id).get();
	}
	
	public Banco salvar(Banco banco) {
		return repository.save(banco);
	}
	
	public void excluir(Integer id) {
		Banco banco = consultarObjeto(id);
		repository.delete(banco);
	}
	
	
}
