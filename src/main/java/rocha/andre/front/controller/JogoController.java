package rocha.andre.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class JogoController {
    @GetMapping("/jogos")
    public String listar() {
        return "jogo/listajogos";
    }

    @GetMapping("/jogos/jogoporid")
    public String listarPorId() {
        return "jogo/jogo";
    }

    @GetMapping("/jogos/criar")
    public String criarJogo() {
        return "jogo/create";
    }

    @GetMapping("/jogos/editar")
    public String editarJogo() {
        return "jogo/update";
    }

    @GetMapping("/teste")
    public String teste() {
        return "teste";
    }
}
