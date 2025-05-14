package com.example.hotelmanage.controller;

import com.example.hotelmanage.auth.config.CustomUserDetails;
import com.example.hotelmanage.model.Reservation;
import com.example.hotelmanage.model.dto.ReservationDto;
import com.example.hotelmanage.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{reservationId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Integer reservationId) {
        return reservationService.getReservationById(reservationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> makeReservation(@RequestBody ReservationDto reservationDto,
                                             @AuthenticationPrincipal CustomUserDetails userDetails){
        try{
            return reservationService.makeReservation(reservationDto, userDetails);
        } catch  (ResponseStatusException ex) {
            Map<String, String> error = new HashMap<>();
            error.put("message", ex.getReason());
            return ResponseEntity.status(ex.getStatusCode()).body(error);
        }
    }

    @DeleteMapping("/{reservationId}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public boolean cancelReservationById(@PathVariable Integer reservationId){
        return reservationService.cancelReservation(reservationId);
    }
}
