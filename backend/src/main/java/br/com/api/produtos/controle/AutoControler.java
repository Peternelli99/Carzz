package br.com.api.produtos.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.produtos.modelo.CarrosModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.servico.AutoService;

@RestController
public class AutoControler {
    
    @Autowired
    private AutoService ps;

    @PostMapping("/auto/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody CarrosModelo pm){
        return ps.cadastrarAlterar(pm,"cadastrar");
    }

    @PutMapping("/auto/alterar")
    public ResponseEntity<?>alterar(@RequestBody CarrosModelo pm){
        return ps.cadastrarAlterar(pm, "alterar");
    }

    @DeleteMapping("/auto/remover/{codigo}")
    public ResponseEntity<RespostaModelo>remover(@PathVariable Long codigo){
        return ps.remover(codigo);
    }

    @GetMapping("/auto/listar")
    public Iterable<CarrosModelo> listar(){
        return ps.listar();
    }

    @GetMapping("/auto")
    public String rota(){
        return"API de automoveis funcionando";
    }
}
