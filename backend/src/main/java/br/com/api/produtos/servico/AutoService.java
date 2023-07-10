package br.com.api.produtos.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.modelo.CarrosModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.repositorio.AutoRepository;

@Service
public class AutoService {
    @Autowired
    private AutoRepository pr;

    @Autowired
    private RespostaModelo rm;

    
    public Iterable<CarrosModelo> listar(){
        return pr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(CarrosModelo pm, String acao){
        
        if(pm.getMarca().equals("")){
            rm.setMensagem("O nome do marca é obrigatorio");
            return new ResponseEntity<RespostaModelo>(rm,HttpStatus.BAD_REQUEST);
        }else if(pm.getModelo().equals("")){
            rm.setMensagem("O nome do modelo é obrigatorio");
            return new ResponseEntity<RespostaModelo>(rm,HttpStatus.BAD_REQUEST);
        }else{
            if(acao.equals("cadastrar")){
                return new ResponseEntity<CarrosModelo>(pr.save(pm), HttpStatus.CREATED);
            }else{
                return new ResponseEntity<CarrosModelo>(pr.save(pm), HttpStatus.OK);
            }
            
        }
    }

    public ResponseEntity<RespostaModelo> remover(long codigo){
        pr.deleteById(codigo);

        rm.setMensagem("O automovel foi removido");

        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }
}
