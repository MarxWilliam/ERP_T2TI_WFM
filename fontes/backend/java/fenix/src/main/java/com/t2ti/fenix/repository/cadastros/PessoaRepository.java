package com.t2ti.fenix.repository.cadastros;

import org.springframework.data.jpa.repository.JpaRepository;

import com.t2ti.fenix.model.cadastros.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Integer>{

}
