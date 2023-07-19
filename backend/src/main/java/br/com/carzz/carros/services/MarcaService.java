package br.com.carzz.carros.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.carzz.carros.entities.Marcas;
import br.com.carzz.carros.repositories.MarcaRepository;

@Service
public class MarcaService {
    
    @Autowired
    private MarcaRepository marcaRepository;

    public Marcas cadastrar(Marcas novoMarca){
        return marcaRepository.save(novoMarca);
    }

    public List<Marcas> listar(){
        return marcaRepository.findAll();
    }

    public Optional<Marcas> listarPorId(Long id){
        return marcaRepository.findById(id);
    }

    public void excluir(Long id){
        marcaRepository.deleteById(id);
    }

}
