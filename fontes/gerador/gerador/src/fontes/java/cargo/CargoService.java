package com.t2ti.fenix.services.cadastros;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.t2ti.fenix.model.cadastros.Cargo;
import com.t2ti.fenix.model.transiente.Filtro;
import com.t2ti.fenix.repository.cadastros.CargoRepository;

@Service
public class CargoService {

	@Autowired
	private CargoRepository repository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	public List<Cargo> consultarLista(){
		return repository.findAll();
	}
	
	public List<Cargo> consultarLista(Filtro filtro){
		String sql = "SELECT * FROM cargo WHERE " + filtro.getWhere();
		Query query = entityManager.createNativeQuery(sql, Cargo.class);
		List<Cargo> lista = (List<Cargo>) query.getResultList();
		return lista;
//		CargoSpecification especificacao = new CargoSpecification(filtro);
//		return repository.findAll(especificacao);
	}
	
	public Cargo consultarObjeto(Integer id){
		return repository.findById(id).get();
	}
	
	public Cargo salvar(Cargo cargo) {
		return repository.save(cargo);
	}
	
	public void excluir(Integer id) {
		Cargo cargo = consultarObjeto(id);
		repository.delete(cargo);
	}
	
	
}
