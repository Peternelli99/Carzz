package br.com.api.produtos.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.produtos.modelo.ClienteModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.servico.ClienteService;

@RestController
public class ClienteControler {
        
    @Autowired
    private ClienteService ps;

    @PostMapping("/cliente/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ClienteModelo pm){
        return ps.cadastrarAlterar(pm,"cadastrar");
    }

    @PutMapping("/cliente/alterar")
    public ResponseEntity<?>alterar(@RequestBody ClienteModelo pm){
        return ps.cadastrarAlterar(pm, "alterar");
    }

    @DeleteMapping("/cliente/remover/{codigo}")
    public ResponseEntity<RespostaModelo>remover(@PathVariable Long codigo){
        return ps.remover(codigo);
    }

    @GetMapping("/cliente/listar")
    public Iterable<ClienteModelo> listar(){
        return ps.listar();
    }

    @GetMapping("/cliente")
    public String rota(){
        return"API cliente esta funcionando";
    }
}
