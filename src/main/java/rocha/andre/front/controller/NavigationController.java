package rocha.andre.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NavigationController {
    @GetMapping("/afterlogin")
    public String afterLogin() {
        return "navigation/after_login";
    }
}
