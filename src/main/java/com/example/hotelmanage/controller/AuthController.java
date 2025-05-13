package com.example.hotelmanage.controller;

import com.example.hotelmanage.auth.model.AuthReq;
import com.example.hotelmanage.auth.model.AuthRes;
import com.example.hotelmanage.auth.model.RegisterReq;
import com.example.hotelmanage.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterReq request) {
        try {
            AuthRes response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException ex) {
            Map<String, String> error = new HashMap<>();
            error.put("message", ex.getReason()); // albo ex.getMessage() jeśli chcesz pełny tekst
            return ResponseEntity.status(ex.getStatusCode()).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthReq request) {
        try {
            AuthRes response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException ex) {
            Map<String, String> error = new HashMap<>();
            error.put("message", ex.getReason());
            return ResponseEntity.status(ex.getStatusCode()).body(error);
        }
    }

}
