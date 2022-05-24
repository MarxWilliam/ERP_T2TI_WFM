package com.t2ti.fenix.services.cadastros;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.t2ti.fenix.model.cadastros.Cliente;
import com.t2ti.fenix.repository.cadastros.ClienteRepository;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository repository;
	
	public List<Cliente> consultarLista(){
		return repository.findAll();
	}
	
	public Cliente consultarObjeto(Integer id){
		return repository.findById(id).get();
	}
	
	public Cliente salvar(Cliente cliente) {
		return repository.save(cliente);
	}
	
	public void excluir(Integer id) {
		Cliente cliente = new Cliente();
		cliente.setId(id);
		repository.delete(cliente);
	}
}
