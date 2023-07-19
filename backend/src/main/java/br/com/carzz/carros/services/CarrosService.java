package br.com.carzz.carros.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.carzz.carros.entities.Cliente;
import br.com.carzz.carros.entities.Carros;
import br.com.carzz.carros.entities.Compra;
import br.com.carzz.carros.repositories.CarrosRepository;
import br.com.carzz.carros.repositories.CompraRepository;

@Service
public class CarrosService {
    
    @Autowired
    private CarrosRepository carroRepository;

    @Autowired
    private CompraRepository compraRepository;

    public Carros cadastrar(Carros novoCurso){
        return carroRepository.save(novoCurso);
    }

    public List<Carros> listar(){
        return carroRepository.findAll();
    }

    public Optional<Carros> listarPorId(Long id){
        return carroRepository.findById(id);
    }

    public void excluir(Long id){
        carroRepository.deleteById(id);
    }

    public Carros editar(Long id, Carros carro){
        carro.setId(id);
        return carroRepository.save(carro);
    }

    public Compra comprar(Cliente aluno, Carros carro){
        Compra compra = new Compra();
        compra.setAluno(aluno);
        compra.setCarro(carro);
        return compraRepository.save(compra);
    }

    public List<Compra> listarCompras(){
        return compraRepository.findAll();
    }

    public void excluirCompra(Long id){
        compraRepository.deleteById(id);
    }

}
