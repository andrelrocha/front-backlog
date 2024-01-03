package rocha.andre.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LivroController {
    @GetMapping("/livros")
    public String listar() {
        return "livro/listalivros";
    }

    @GetMapping("/livros/livroporid")
    public String listarPorId() {
        return "livro/livro";
    }

    @GetMapping("/livros/criar")
    public String create() {
        return "livro/create";
    }

    @GetMapping("/livros/update")
    public String updateLivro() {
        return "livro/update";
    }

    @GetMapping("/livros/emprestimos")
    public String emprestimoLivro() {
        return "livro/listaemprestimoslivro";
    }

}

