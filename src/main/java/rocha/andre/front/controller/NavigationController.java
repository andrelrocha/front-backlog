package rocha.andre.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller("/navigation")
public class NavigationController {
    @GetMapping("/afterlogin")
    public String afterLogin() {
        return "navigation/afterlogin";
    }
}
