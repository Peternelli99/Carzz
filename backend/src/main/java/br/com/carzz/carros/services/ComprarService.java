package br.com.carzz.carros.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.carzz.carros.entities.Compra;
import br.com.carzz.carros.repositories.CompraRepository;

@Service
public class ComprarService {
    @Autowired
    private CompraRepository compraRepository;

    public Compra cadastrar(Compra novaCompra){
        return compraRepository.save(novaCompra);
    }

    public List<Compra> listar(){
        return compraRepository.findAll();
    }
}
