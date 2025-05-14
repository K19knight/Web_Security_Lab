package com.example.hotelmanage.controller;

import com.example.hotelmanage.auth.config.CustomUserDetails;
import com.example.hotelmanage.auth.model.AuthReq;
import com.example.hotelmanage.auth.model.AuthRes;
import com.example.hotelmanage.auth.model.RegisterReq;
import com.example.hotelmanage.model.dto.ChangePasswordDto;
import com.example.hotelmanage.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
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
            error.put("message", ex.getReason());
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

    @PutMapping("/changePassword")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody ChangePasswordDto passwordDto){
        return authService.changePassword(userDetails, passwordDto);
    }

}
