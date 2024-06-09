package com.example.demo.controller;

import com.example.demo.dto.CupboardLayoutDTO;
import com.example.demo.model.CupboardLayout;
import com.example.demo.service.CupboardLayoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CupboardLayoutController {
    @Autowired
    private CupboardLayoutService cupboardLayoutService;

    @PostMapping("/savelayout")
    public ResponseEntity<String> saveLayout(@RequestBody CupboardLayoutDTO cupboardLayoutDTO) {
        cupboardLayoutService.saveLayoutConfig(cupboardLayoutDTO.getConfiguration());
        return ResponseEntity.ok("Layout saved successfully");
    }

    @GetMapping("/getlayouts")
    public ResponseEntity<List<CupboardLayout>> getLayouts() {
        List<CupboardLayout> layouts = cupboardLayoutService.getAllLayoutConfigs();
        return ResponseEntity.ok(layouts);
    }

}
