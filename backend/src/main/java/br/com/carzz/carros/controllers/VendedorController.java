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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.carzz.carros.entities.Vendedor;
import br.com.carzz.carros.services.VendedorService;

@RestController
@RequestMapping(path = "/api/vendedor")
public class VendedorController {
    
    @Autowired
    private VendedorService vendedorService;

    @PostMapping(path = "/cadastrar")
    public ResponseEntity<Vendedor> cadastrarVendedor(@RequestBody Vendedor novoVendedor){
        return ResponseEntity.ok().body(vendedorService.cadastrar(novoVendedor));
    }

    @GetMapping(path = "/listar")
    public ResponseEntity<List<Vendedor>> listarVendedor(){
        List<Vendedor> vendedores = vendedorService.listar();
        return ResponseEntity.ok().body(vendedores);
    }

    @GetMapping(path = "/listar/{id}")
    public ResponseEntity<Optional<Vendedor>> listarPorId(@PathVariable Long id){
        return ResponseEntity.ok().body(vendedorService.listarPorId(id));
    }

    @DeleteMapping(path = "/excluir/{id}")
    public ResponseEntity<HttpStatus> excluirVendedor(@PathVariable Long id){
        try{
            vendedorService.excluir(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
