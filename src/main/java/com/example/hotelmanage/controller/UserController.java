package com.example.hotelmanage.controller;

import com.example.hotelmanage.auth.config.CustomUserDetails;
import com.example.hotelmanage.auth.model.RegisterReq;
import com.example.hotelmanage.model.dto.UpdateUserDto;
import com.example.hotelmanage.model.dto.UserDto;
import com.example.hotelmanage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getAll")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Integer userId){
        return userService.getUserById(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{userId}")
    @ResponseBody
    public boolean deleteUserByID(@PathVariable Integer userId) {
        return userService.deleteUser(userId);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> editUserById(@PathVariable Integer userId, @AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody UpdateUserDto userDto){
        try{
            return userService.updateUser(userDetails, userId, userDto)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (ResponseStatusException ex) {
            Map<String, String> error = new HashMap<>();
            error.put("message", ex.getReason());
            return ResponseEntity.status(ex.getStatusCode()).body(error);
        }
    }

}
