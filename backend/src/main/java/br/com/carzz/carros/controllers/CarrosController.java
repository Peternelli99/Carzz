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
import br.com.carzz.carros.entities.Carros;
import br.com.carzz.carros.entities.Compra;
import br.com.carzz.carros.services.CarrosService;

@RestController
@RequestMapping(path = "/api/carros")
public class CarrosController {

    @Autowired
    private CarrosService carroService;
    
    @PostMapping(path = "/cadastrar")
    public ResponseEntity<Carros> cadastrarCarros(@RequestBody Carros novaCarro){
        return ResponseEntity.ok().body(carroService.cadastrar(novaCarro));
    }

    @GetMapping(path = "/listar")
    public ResponseEntity<List<Carros>> listarCarros(){
        List<Carros> carros = carroService.listar();
        return ResponseEntity.ok().body(carros);
    }

    @GetMapping(path = "/listar/{id}")
    public ResponseEntity<Optional<Carros>> listarPorId(@PathVariable Long id){
        return ResponseEntity.ok().body(carroService.listarPorId(id));
    }

    @DeleteMapping(path = "/excluir/{id}")
    public ResponseEntity<HttpStatus> excluirCarro(@PathVariable Long id){
        try{
            carroService.excluir(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/listar/compras")
    public ResponseEntity<List<Compra>> listarCompras(){
        List<Compra> compras = carroService.listarCompras();
        return ResponseEntity.ok().body(compras);
    }

    @PostMapping(path = "/comprar")
    public ResponseEntity<Compra> comprar(@RequestBody Carros carro,
                                                @RequestBody Cliente aluno){
        return ResponseEntity.ok().body(carroService.comprar(aluno, carro));
    }

    @DeleteMapping(path = "/compra/excluir/{id}")
    public ResponseEntity<HttpStatus> excluirCompra(@PathVariable Long id){
        try{
            carroService.excluirCompra(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/editar/{id}")
    public ResponseEntity<Carros> editarCarro(@PathVariable Long id, @RequestBody Carros carro){
        return ResponseEntity.ok().body(carroService.editar(id, carro));
    }

}
