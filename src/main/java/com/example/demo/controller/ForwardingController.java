package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardingController {

    @RequestMapping(value = "/**/{path:[^.]*}")
    public String forward(@PathVariable String path) {
        // Forward to home page so that route is preserved and Angular Router loads the correct page
        return "forward:/";
    }
}
