package br.com.carzz.carros.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.carzz.carros.entities.Concessionaria;
import br.com.carzz.carros.repositories.ConcessionariaRepository;

@Service
public class ConcessionariaService{
    
    @Autowired
    private ConcessionariaRepository concessionariaRepository;

    public Concessionaria cadastrar(Concessionaria novoConcessionaria){
        return concessionariaRepository.save(novoConcessionaria);
    }

    public List<Concessionaria> listar(){
        return concessionariaRepository.findAll();
    }

    public Optional<Concessionaria> listarPorId(Long id){
        return concessionariaRepository.findById(id);
    }

    public void excluir(Long id){
        concessionariaRepository.deleteById(id);
    }

}
