package br.com.carzz.carros.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.carzz.carros.entities.Compra;

public interface CompraRepository extends JpaRepository<Compra, Long>{
    
}
