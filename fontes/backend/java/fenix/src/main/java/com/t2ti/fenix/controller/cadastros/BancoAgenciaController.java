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
import com.t2ti.fenix.model.cadastros.BancoAgencia;
import com.t2ti.fenix.model.cadastros.BancoAgencia;
import com.t2ti.fenix.model.transiente.Filtro;
import com.t2ti.fenix.services.cadastros.BancoAgenciaService;

@RestController
@RequestMapping("/banco-agencia")
public class BancoAgenciaController {
	
	@Autowired
	private BancoAgenciaService service;
	
	@GetMapping		
	public List<BancoAgencia> consultarLista(@RequestParam(required = false) String filter){
		//?filter=nome||$cont||z
		try {
			if(filter == null) {
				return service.consultarLista();
			} else { //define filtro
				Filtro filtro = new Filtro(filter);
				return service.consultarLista(filtro);
			}
		} catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Consultar Lista BancoAgencia] - Exceção: " + e.getMessage());
		}
	}

	@GetMapping("/{id}")
	public BancoAgencia consultarObjeto(@PathVariable Integer id) {
		try {
			try {
				return service.consultarObjeto(id);
			} catch(NoSuchElementException ex){
				throw new RecursoNaoEncontradoException("Registro com id: " + id + " não localizado - [Consultar Objeto BancoAgencia].");
			}
		} catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Consultar Objeto BancoAgencia] - Exceção: " + e.getMessage());
		}
	}	
	
	@PostMapping
	public BancoAgencia inserir(@RequestBody BancoAgencia bancoAgencia) {
		try {
			return service.salvar(bancoAgencia);
		} catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Inserir BancoAgencia] - Exceção: " + e.getMessage());
		}
	}
	
	@PutMapping("/{id}")
	public BancoAgencia alterar(@RequestBody BancoAgencia bancoAgencia, @PathVariable Integer id){
		try {
			if(!(bancoAgencia.getId() == id)) {
				throw new RequisicaoRuimException("Objeto inválido [Alterar BancoAgencia] - ID do objeto difere do ID da URL.");
			}
			
			BancoAgencia objeto = service.consultarObjeto(bancoAgencia.getId());
			if(objeto!=null) {
				return service.salvar(bancoAgencia);
			} else 
			{
				throw new RequisicaoRuimException("Objeto com ID inválido [Alterar BancoAgencia]."); 
			}
		}  catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Alterar BancoAgencia] - Exceção: " + e.getMessage());
		}		 
	} 
	
	
	@DeleteMapping("/{id}")
	public void excluir(@PathVariable Integer id) throws Exception {
		try {
		service.excluir(id);
		} catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Excluir BancoAgencia] - Exceção: " + e.getMessage());
		}
	}
	
//	@GetMapping		
//	public List<BancoAgenciaAgencia> consultarLista(){
//		return service.consultarLista();
//	}
//	
//	@GetMapping("/{id}")
//	public BancoAgenciaAgencia consultarObjeto(@PathVariable Integer id) {
//		try {
//		return service.consultarObjeto(id);
//		} catch(NoSuchElementException ex){
//			throw new RecursoNaoEncontradoException("Registro com id: " + id + " não encontrado.");
//		}
//	}
//	
//	@PostMapping
//	public BancoAgenciaAgencia salvar(@RequestBody BancoAgenciaAgencia bancoAgenciaAgencia) {
//		return service.salvar(bancoAgenciaAgencia);
//	}
//	
//	@DeleteMapping("/{id}")
//	public void excluir(@PathVariable Integer id) throws Exception {
//		try {
//		service.excluir(id);
//		} catch(Exception e) {
//			throw new Exception("Erro ao excluir item.");
//		}
//	}
}
