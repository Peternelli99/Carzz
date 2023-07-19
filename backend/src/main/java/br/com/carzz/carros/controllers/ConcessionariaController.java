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

import br.com.carzz.carros.entities.Concessionaria;
import br.com.carzz.carros.services.ConcessionariaService;

@RestController
@RequestMapping(path = "/api/concessionaria")
public class ConcessionariaController {

    @Autowired
    private ConcessionariaService concessionariaService;
    
    @PostMapping(path = "/cadastrar")
    public ResponseEntity<Concessionaria> cadastrarConcessionaria(@RequestBody Concessionaria novaConcessionaria){
        return ResponseEntity.ok().body(concessionariaService.cadastrar(novaConcessionaria));
    }

    @GetMapping(path = "/listar")
    public ResponseEntity<List<Concessionaria>> listarConcessionarias(){
        List<Concessionaria> concessionarias = concessionariaService.listar();
        return ResponseEntity.ok().body(concessionarias);
    }

    @GetMapping(path = "/listar/{id}")
    public ResponseEntity<Optional<Concessionaria>> listarPorId(@PathVariable Long id){
        return ResponseEntity.ok().body(concessionariaService.listarPorId(id));
    }

    @DeleteMapping(path = "/excluir/{id}")
    public ResponseEntity<HttpStatus> excluirConcessionaria(@PathVariable Long id){
        try{
            concessionariaService.excluir(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

}
