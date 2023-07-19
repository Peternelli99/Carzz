package br.com.carzz.carros.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.carzz.carros.entities.Cliente;
import br.com.carzz.carros.services.ClienteService;

@RestController
@RequestMapping(path = "/api/cliente")
public class ClienteController {
    
    @Autowired
    private ClienteService clienteService;

    @PostMapping(path = "/cadastrar")
    public ResponseEntity<Cliente> cadastrarCliente(@RequestBody Cliente novoCliente){
        return ResponseEntity.ok().body(clienteService.cadastrar(novoCliente));
    }

    @GetMapping(path = "/listar")
    public ResponseEntity<List<Cliente>> listarCliente(){
        List<Cliente> clientes = clienteService.listar();
        return ResponseEntity.ok().body(clientes);
    }

    @GetMapping(path = "/listar/{id}")
    public ResponseEntity<Optional<Cliente>> listarPorId(@PathVariable Long id){
        return ResponseEntity.ok().body(clienteService.listarPorId(id));
    }

    @DeleteMapping(path = "/excluir/{id}")
    public ResponseEntity<HttpStatus> excluirCliente(@PathVariable Long id){
        try{
            clienteService.excluir(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/editar/{id}")
    public ResponseEntity<Cliente> editarCliente(@PathVariable Long id, @RequestBody Cliente cliente){
        return ResponseEntity.ok().body(clienteService.editar(id, cliente));
    }

}
