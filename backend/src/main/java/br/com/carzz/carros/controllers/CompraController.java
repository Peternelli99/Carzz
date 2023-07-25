package br.com.carzz.carros.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.carzz.carros.entities.Compra;
import br.com.carzz.carros.services.ComprarService;

@RestController
@RequestMapping(path= "/api/comprar")
public class CompraController {
    @Autowired
    private ComprarService comprarService;

    @PostMapping(path="cadastrar")
    public ResponseEntity<Compra> cadastrarCarros(@RequestBody Compra novaCompra){
        return ResponseEntity.ok().body(comprarService.cadastrar(novaCompra));
    }

    @GetMapping(path = "/listar")
    public ResponseEntity<List<Compra>> listarCarros(){
        List<Compra> compras = comprarService.listar();
        return ResponseEntity.ok().body(compras);
    }
}
