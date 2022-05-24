/*****************************************************************
Title: T2Ti ERP Fenix
Description: Model relacionado a tabela [PESSOA]
License: Apache2
Copyright: Copyright 2020 (C) William Marx

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

      The author may be contacted at:
          marxwilliamf@gmail.com

@Author: William Felipe Marx (marxwilliamf@gmail.com)
@version: 1.0.0
*****************************************************************/

package com.t2ti.fenixgerado.controller.cadastros;

import java.util.List;
import java.util.Set;
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

import com.t2ti.fenixgerado.exception.ExcecaoGenericaServidorException;
import com.t2ti.fenixgerado.exception.RecursoNaoEncontradoException;
import com.t2ti.fenixgerado.exception.RequisicaoRuimException;
import com.t2ti.fenixgerado.model.cadastros.Pessoa;
import com.t2ti.fenixgerado.model.transiente.Filtro;
import com.t2ti.fenixgerado.services.cadastros.PessoaService;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {
	
	@Autowired
	private PessoaService service;
	
	@GetMapping		
	public List<Pessoa> consultarLista(@RequestParam(required = false) String filter){
		//?filter=nome||$cont||z
		try {
			if(filter == null) {
				return service.consultarLista();
			} else { //define filtro
				Filtro filtro = new Filtro(filter);
				return service.consultarLista(filtro);
			}
		} catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Consultar Lista Pessoa] - Exceção: " + e.getMessage());
		}
	}

	@GetMapping("/{id}")
	public Pessoa consultarObjeto(@PathVariable Integer id) {
		try {
			try {
				return service.consultarObjeto(id);
			} catch(NoSuchElementException ex){
				throw new RecursoNaoEncontradoException("Registro com id: " + id + " não localizado - [Consultar Objeto Pessoa].");
			}
		} catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Consultar Objeto Pessoa] - Exceção: " + e.getMessage());
		}
	}	
	
	@PostMapping
	public Pessoa inserir(@RequestBody Pessoa pessoa) {
		try {
			return service.salvar(pessoa);
		} catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Inserir Pessoa] - Exceção: " + e.getMessage());
		}
	}
	
	@PutMapping("/{id}")
	public Pessoa alterar(@RequestBody Pessoa pessoa, @PathVariable Integer id){
		try {
			if(!(pessoa.getId() == id)) {
				throw new RequisicaoRuimException("Objeto inválido [Alterar Pessoa] - ID do objeto difere do ID da URL.");
			}
			
			Pessoa objeto = service.consultarObjeto(pessoa.getId());
			if(objeto!=null) {
				return service.salvar(pessoa);
			} else 
			{
				throw new RequisicaoRuimException("Objeto com ID inválido [Alterar Banco]."); 
			}
		}  catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Alterar Pessoa] - Exceção: " + e.getMessage());
		}		 
	} 
	
	
	@DeleteMapping("/{id}")
	public void excluir(@PathVariable Integer id) throws Exception {
		try {
			service.excluir(id);
		} catch(Exception e) {
			throw new ExcecaoGenericaServidorException("Erro no Servidor [Excluir Pessoa] - Exceção: " + e.getMessage());
		}
	}
}