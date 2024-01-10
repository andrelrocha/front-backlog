package rocha.andre.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class JogandoController {
    @GetMapping("/jogando")
    public String listar() {
        return "jogando/listajogando";
    }
}
