package rocha.andre.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DropadoController {
    @GetMapping("/dropados")
    public String get() {
        return "dropado/listadropado";
    }

    @GetMapping("/jogodropado")
    public String getJogoDropadoPorID() {
        return "dropado/jogodropado";
    }
    
    @GetMapping("/jogodropado/editar")
    public String updateJogoDropado() {
        return "dropado/updatedropado";
    }
}
