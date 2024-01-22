package rocha.andre.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OpiniaoController {
    @GetMapping("/opinioes")
    public String get() {
        return "opiniao/listaopiniao";
    }
}
