package com.t2ti.fenix.controller.cadastros;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.t2ti.fenix.exception.ExcecaoGenericaServidorException;
import com.t2ti.fenix.exception.RecursoNaoEncontradoException;
import com.t2ti.fenix.exception.RequisicaoRuimException;
import com.t2ti.fenix.model.cadastros.Cargo;
import com.t2ti.fenix.model.transiente.Filtro;
import com.t2ti.fenix.services.cadastros.CargoService;

@RestController
@RequestMapping("/cargo")
public class CargoController {
	
	@Autowired
	private CargoService service;
	
	@GetMapping		
	public List<Cargo> consultarLista(@RequestParam(required = false) String filter){
		//?filter=nome||$cont||z
		try {
			if(filter == null) {
				return service.consultarLista();
			} else { //define filtro
				Filtro filtro = new Filtro(filter);
				return service.consultarLista(filtro);
			}
		} catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Consultar Lista Cargo] - Exceção: " + e.getMessage());
		}
	}

	@GetMapping("/{id}")
	public Cargo consultarObjeto(@PathVariable Integer id) {
		try {
			try {
				return service.consultarObjeto(id);
			} catch(NoSuchElementException ex){
				throw new RecursoNaoEncontradoException("Registro com id: " + id + " não localizado - [Consultar Objeto Cargo].");
			}
		} catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Consultar Objeto Cargo] - Exceção: " + e.getMessage());
		}
	}	
	
	@PostMapping
	public Cargo inserir(@RequestBody Cargo cargo) {
		try {
			return service.salvar(cargo);
		} catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Inserir Cargo] - Exceção: " + e.getMessage());
		}
	}
	
	@PutMapping("/{id}")
	public Cargo alterar(@RequestBody Cargo cargo, @PathVariable Integer id){
		try {
			if(!(cargo.getId() == id)) {
				throw new RequisicaoRuimException("Objeto inválido [Alterar Cargo] - ID do objeto difere do ID da URL.");
			}
			
			Banco objeto = service.consultarObjeto(cargo.getId());
			if(objeto!=null) {
				return service.salvar(cargo);
			} else 
			{
				throw new RequisicaoRuimException("Objeto com ID inválido [Alterar Banco]."); 
			}
		}  catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Alterar Cargo] - Exceção: " + e.getMessage());
		}		 
	} 
	
	
	@DeleteMapping("/{id}")
	public void excluir(@PathVariable Integer id) throws Exception {
		try {
			service.excluir(id);
		} catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Excluir Cargo] - Exceção: " + e.getMessage());
		}
	}
}