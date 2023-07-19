package br.com.carzz.carros.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.carzz.carros.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
}
