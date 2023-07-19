package br.com.carzz.carros.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.carzz.carros.entities.Concessionaria;


public interface ConcessionariaRepository extends JpaRepository<Concessionaria, Long> {
    
}
