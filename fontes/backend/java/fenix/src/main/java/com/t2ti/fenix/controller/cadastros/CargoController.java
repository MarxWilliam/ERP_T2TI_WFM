package com.t2ti.fenix.controller.cadastros;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.t2ti.fenix.exception.RecursoNaoEncontradoException;
import com.t2ti.fenix.model.cadastros.Cargo;
import com.t2ti.fenix.services.cadastros.CargoService;

@RestController
@RequestMapping("/cargo")
public class CargoController {
	
	@Autowired
	private CargoService service;
	
	@GetMapping		
	public List<Cargo> consultarLista(){
		return service.consultarLista();
	}
	
	@GetMapping("/{id}")
	public Cargo consultarObjeto(@PathVariable Integer id) {
		try {
		return service.consultarObjeto(id);
		} catch(NoSuchElementException ex){
			throw new RecursoNaoEncontradoException("Registro com id: " + id + " não encontrado.");
		}
	}
	
	@PostMapping
	public Cargo salvar(@RequestBody Cargo cargo) {
		return service.salvar(cargo);
	}
	
	@DeleteMapping("/{id}")
	public void excluir(@PathVariable Integer id) throws Exception {
		try {
		service.excluir(id);
		} catch(Exception e) {
			throw new Exception("Erro ao excluir item.");
		}
	}
}
