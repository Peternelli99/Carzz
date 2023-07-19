package br.com.carzz.carros.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.carzz.carros.entities.Cliente;
import br.com.carzz.carros.repositories.ClienteRepository;

@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente cadastrar(Cliente novoCliente){
        return clienteRepository.save(novoCliente);
    }

    public List<Cliente> listar(){
        return clienteRepository.findAll();
    }

    public Optional<Cliente> listarPorId(Long id){
        return clienteRepository.findById(id);
    }

    public void excluir(Long id){
        clienteRepository.deleteById(id);
    }

    public Cliente editar(Long id, Cliente cliente){
        cliente.setId(id);
        return clienteRepository.save(cliente);
    }

}
