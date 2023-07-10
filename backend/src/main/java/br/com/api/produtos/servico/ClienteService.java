package br.com.api.produtos.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.modelo.ClienteModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.repositorio.ClienteRepository;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository pr;

    @Autowired
    private RespostaModelo rm;

    
    public Iterable<ClienteModelo> listar(){
        return pr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(ClienteModelo pm, String acao){
        
        if(pm.getNome().equals("")){
            rm.setMensagem("O nome do Cliente é obrigatorio");
            return new ResponseEntity<RespostaModelo>(rm,HttpStatus.BAD_REQUEST);
        }else if(pm.getTelefone().equals("")){
            rm.setMensagem("O numero do Telefone é obrigatorio");
            return new ResponseEntity<RespostaModelo>(rm,HttpStatus.BAD_REQUEST);
        }else if(pm.getEndereço().equals("")){
            rm.setMensagem("O Endereço é obrigatorio");
            return new ResponseEntity<RespostaModelo>(rm,HttpStatus.BAD_REQUEST);
        }else{
            if(acao.equals("cadastrar")){
                return new ResponseEntity<ClienteModelo>(pr.save(pm), HttpStatus.CREATED);
            }else{
                return new ResponseEntity<ClienteModelo>(pr.save(pm), HttpStatus.OK);
            }
            
        }
    }

    public ResponseEntity<RespostaModelo> remover(long codigo){
        pr.deleteById(codigo);

        rm.setMensagem("O automovel foi removido");

        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }
}
