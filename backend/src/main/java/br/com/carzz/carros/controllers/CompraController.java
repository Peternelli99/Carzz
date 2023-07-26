package br.com.carzz.carros.controllers;

import java.util.List;

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

import br.com.carzz.carros.entities.Compra;
import br.com.carzz.carros.repositories.CompraRepository;
import br.com.carzz.carros.services.ComprarService;

@RestController
@RequestMapping(path= "/api/comprar")
public class CompraController {
    @Autowired
    private ComprarService comprarService;

    @Autowired
    private CompraRepository compraRepository;

    @PostMapping(path = "/comprar")
    public ResponseEntity<Compra> cadastrarCompra(@RequestBody Compra novaCompra){
        return ResponseEntity.ok().body(comprarService.cadastrar(novaCompra));
    }

    @GetMapping(path = "/listar")
    public ResponseEntity<List<Compra>> listarCarros(){
        List<Compra> compras = comprarService.listar();
        return ResponseEntity.ok().body(compras);
    }

    @DeleteMapping(path = "/excluir/{id}")
    public ResponseEntity<HttpStatus> excluirCompra(@PathVariable Long id){
        try{
            comprarService.excluirCompra(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/editar/{id}")
    public ResponseEntity<Compra> editarCompra(@PathVariable Long id, @RequestBody Compra compra){
        return ResponseEntity.ok().body(comprarService.editar(id, compra));
    }
}
