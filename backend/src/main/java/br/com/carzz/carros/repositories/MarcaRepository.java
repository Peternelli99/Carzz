package br.com.carzz.carros.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.carzz.carros.entities.Marcas;

public interface MarcaRepository extends JpaRepository<Marcas, Long>{
    
}
