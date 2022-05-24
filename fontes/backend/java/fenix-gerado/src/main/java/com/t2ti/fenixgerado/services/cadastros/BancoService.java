/*****************************************************************
Title: T2Ti ERP Fenix
Description: Model relacionado a tabela [BANCO]
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

package com.t2ti.fenixgerado.services.cadastros;

import java.util.List;

import javax.persistence.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.t2ti.fenixgerado.model.cadastros.Banco;
import com.t2ti.fenixgerado.model.transiente.Filtro;
import com.t2ti.fenixgerado.repository.cadastros.BancoRepository;

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
		String sql = "SELECT * FROM BANCO WHERE " + filtro.getWhere();
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
