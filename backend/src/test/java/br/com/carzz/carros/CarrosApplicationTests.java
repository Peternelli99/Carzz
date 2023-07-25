package br.com.carzz.carros;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import br.com.carzz.carros.controllers.ConcessionariaController;
import br.com.carzz.carros.entities.Concessionaria;
import br.com.carzz.carros.services.ConcessionariaService;

@SpringBootTest
class CarrosApplicationTests {

	@Autowired
	private ConcessionariaService concessionariaService;

	@Autowired
	private ConcessionariaController concessionariaController;

	@Test
	void TesteCriarConcessionaria() {
		Concessionaria concessionariaTeste = new Concessionaria();
		concessionariaTeste.setDataCriacao(new Date());
		concessionariaTeste.setNome("loja de carros");
		Concessionaria novoConcessionaria = concessionariaService.cadastrar(concessionariaTeste);
		assertEquals(concessionariaTeste, novoConcessionaria);
	}

	@Test
	void testeListarConcessionaria(){
		List<Concessionaria> concessionariaBuscada = concessionariaService.listar();
		assertEquals("loja de carros", concessionariaBuscada.get(concessionariaBuscada.size()-1).getNome());
	}

	@Test
	void testeRemoverConcessionaria(){
		ResponseEntity<HttpStatus> respostaAceita = new ResponseEntity<>(HttpStatus.ACCEPTED);
		ResponseEntity<HttpStatus> resposta = concessionariaController.excluirConcessionaria(Long.valueOf(9));
		assertEquals(respostaAceita, resposta);

	}

}
