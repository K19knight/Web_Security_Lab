package com.example.hotelmanage.controller;

import com.example.hotelmanage.auth.model.AuthReq;
import com.example.hotelmanage.model.Reservation;
import com.example.hotelmanage.model.User;
import com.example.hotelmanage.repository.UnsecureReservationRepository;
import com.example.hotelmanage.repository.UnsecureUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/unsecure")
@RequiredArgsConstructor
public class UnsecureController {
    private final UnsecureUserRepository unsecureUserRepository;
    private final UnsecureReservationRepository unsecureReservationRepository;

    @PostMapping("/login")
    public List<User> getAllUsersUnsecure(@RequestBody AuthReq req) {
        return unsecureUserRepository.findByRawQuery(req.getEmail(), req.getPassword());
    }

    @PostMapping("/reservation/search")
    public List<Reservation> searchReservations(@RequestBody Map<String, String> body) {
        String reservationIdRaw = body.get("id");
        return unsecureReservationRepository.findByRawReservationId(reservationIdRaw);
    }

}
