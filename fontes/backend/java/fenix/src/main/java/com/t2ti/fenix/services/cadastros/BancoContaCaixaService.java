package com.t2ti.fenix.services.cadastros;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.t2ti.fenix.model.cadastros.BancoContaCaixa;
import com.t2ti.fenix.repository.cadastros.BancoContaCaixaRepository;

@Service
public class BancoContaCaixaService {

	@Autowired
	private BancoContaCaixaRepository repository;
	
	public List<BancoContaCaixa> consultarLista(){
		return repository.findAll();
	}
	
	public BancoContaCaixa consultarObjeto(Integer id){
		return repository.findById(id).get();
	}
	
	public BancoContaCaixa salvar(BancoContaCaixa bancoContaCaixa) {
		return repository.save(bancoContaCaixa);
	}
	
	public void excluir(Integer id) {
		BancoContaCaixa bancoContaCaixa = consultarObjeto(id);
		repository.delete(bancoContaCaixa);
	}
	
	
}
