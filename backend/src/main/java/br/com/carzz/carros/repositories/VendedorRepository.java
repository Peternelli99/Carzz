package br.com.carzz.carros.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.carzz.carros.entities.Vendedor;

public interface VendedorRepository extends JpaRepository<Vendedor, Long>{
    
}
