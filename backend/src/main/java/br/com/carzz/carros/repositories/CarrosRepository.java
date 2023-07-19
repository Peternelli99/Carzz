package br.com.carzz.carros.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.carzz.carros.entities.Carros;

public interface CarrosRepository extends JpaRepository<Carros, Long> {
    
}