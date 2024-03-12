package rocha.andre.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class FinalizadoController {
    @GetMapping("/finalizados")
    public String get() {
        return "finalizado/listafinalizado";
    }

    @GetMapping("/jogofinalizado")
    public String getOpiniaoJogo() {
        return "finalizado/jogofinalizado";
    }

    @GetMapping("/jogofinalizado/editar") 
    public String getOpiniaoJogoEditar() {
        return "finalizado/updatefinalizado";
    }   
}
