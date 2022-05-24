package com.t2ti.fenix.repository.cadastros;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.t2ti.fenix.model.cadastros.Cargo;

public interface CargoRepository extends JpaRepository<Cargo, Integer>{//, JpaSpecificationExecutor<Cargo>

}
