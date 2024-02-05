package rocha.andre.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {
    @GetMapping("/users/create")
    public String create() {
        return "user/create";
    }

    @GetMapping("/signup")
    public String signup() {
        return "user/create";
    }

    @GetMapping("/login")
    public String login() {
        return "user/login";
    }

    @GetMapping("/forgotpassword")
    public String forgot() {
        return "user/forgot";
    }

    @GetMapping("/")
    public String homepage() {
        return "user/login";
    }
}
