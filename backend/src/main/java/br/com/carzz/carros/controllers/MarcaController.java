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

import br.com.carzz.carros.entities.Marcas;
import br.com.carzz.carros.services.MarcaService;

@RestController
@RequestMapping(path = "/api/marca")
public class MarcaController {
    
    @Autowired
    private MarcaService marcaService;

    @PostMapping(path = "/cadastrar" )
    public ResponseEntity<Marcas> cadastrarMarca(@RequestBody Marcas novaMarca){
        System.out.println(novaMarca);
        return ResponseEntity.ok().body(marcaService.cadastrar(novaMarca));
    }

    @GetMapping(path = "/listar")
    public ResponseEntity<List<Marcas>> listarMarca(){
        List<Marcas> marcas = marcaService.listar();
        return ResponseEntity.ok().body(marcas);
    }

    @GetMapping(path = "/listar/{id}")
    public ResponseEntity<Optional<Marcas>> listarPorId(@PathVariable Long id){
        return ResponseEntity.ok().body(marcaService.listarPorId(id));
    }

    @DeleteMapping(path = "/excluir/{id}")
    public ResponseEntity<HttpStatus> excluirMarca(@PathVariable Long id){
        try{
            marcaService.excluir(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
