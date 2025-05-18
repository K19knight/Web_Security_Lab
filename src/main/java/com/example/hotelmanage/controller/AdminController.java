package com.example.hotelmanage.controller;

import com.example.hotelmanage.model.dto.BlockUserDto;
import com.example.hotelmanage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;
    @PostMapping("/block")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> toggleUserBlock(@RequestBody BlockUserDto dto) {
        userService.toggleUserBlock(dto.getUserId());
        return ResponseEntity.ok().build();
    }
}
