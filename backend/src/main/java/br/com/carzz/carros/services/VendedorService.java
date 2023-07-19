package br.com.carzz.carros.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.carzz.carros.entities.Vendedor;
import br.com.carzz.carros.repositories.VendedorRepository;

@Service
public class VendedorService {
    
    @Autowired
    private VendedorRepository vendedorRepository;

    public Vendedor cadastrar(Vendedor novoVendedor){
        return vendedorRepository.save(novoVendedor);
    }

    public List<Vendedor> listar(){
        return vendedorRepository.findAll();
    }

    public Optional<Vendedor> listarPorId(Long id){
        return vendedorRepository.findById(id);
    }

    public void excluir(Long id){
        vendedorRepository.deleteById(id);
    }

}
