package com.t2ti.fenix.specification.cadastros;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.t2ti.fenix.model.cadastros.Banco;
import com.t2ti.fenix.model.transiente.Filtro;

public class BancoSpecification implements Specification<Banco>{
	private static final long serialVersionUID = 1L;
	private Filtro filtro;
	
	public BancoSpecification(final Filtro filtro) {
		super();
		this.filtro = filtro;
	}

	@Override
	public Predicate toPredicate(Root<Banco> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		//verifica se valor é diferente de vazio e se for filtra por campo/valor
		if(!filtro.getValor().isEmpty()) {
			return builder.like(
					root.<String>get(filtro.getCampo()), "%" + filtro.getValor() + "%");
		} else if(!filtro.getDataInicial().isEmpty() && !filtro.getDataFinal().isEmpty()) {
			return builder.between(root.<String>get(filtro.getCampo()), filtro.getDataInicial(), filtro.getDataFinal());
		}
		return null;
	}
}
