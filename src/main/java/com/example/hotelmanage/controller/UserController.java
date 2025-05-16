package com.example.hotelmanage.controller;

import com.example.hotelmanage.auth.config.CustomUserDetails;
import com.example.hotelmanage.auth.model.RegisterReq;
import com.example.hotelmanage.model.dto.ChangePasswordDto;
import com.example.hotelmanage.model.dto.UpdateUserDto;
import com.example.hotelmanage.model.dto.UserDto;
import com.example.hotelmanage.service.ReservationService;
import com.example.hotelmanage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserDto> getUserById(@PathVariable Integer userId){
        return userService.getUserById(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseBody
    public boolean deleteUserByID(@PathVariable Integer userId) {
        return userService.deleteUser(userId);
    }

    
    @GetMapping("/myProfile")
    @PreAuthorize("isAuthenticated()")
    public Optional<UserDto> getMyProfile(@AuthenticationPrincipal CustomUserDetails userDetails){
        return userService.getMyProfile(userDetails);
    }
    
    @PutMapping("/myProfile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> editUserById(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody UpdateUserDto userDto){
        try{
            return userService.updateUser(userDetails, userDto)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (ResponseStatusException ex) {
            Map<String, String> error = new HashMap<>();
            error.put("message", ex.getReason());
            return ResponseEntity.status(ex.getStatusCode()).body(error);
        }
    }

    @GetMapping("/myReservation")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getMyReservations(@AuthenticationPrincipal CustomUserDetails userDetails){
        return reservationService.getMyReservations(userDetails);
    }

    @DeleteMapping("/myReservation/{reservationId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> cancelMyReservation(@PathVariable Integer reservationId, @AuthenticationPrincipal CustomUserDetails userDetails){
        try{
            return reservationService.cancelMyReservation(reservationId, userDetails);
        } catch (ResponseStatusException ex) {
            Map<String, String> error = new HashMap<>();
            error.put("message", ex.getReason());
            return ResponseEntity.status(ex.getStatusCode()).body(error);
        }
    }


}
