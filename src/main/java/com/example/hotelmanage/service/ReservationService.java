package com.example.hotelmanage.service;

import com.example.hotelmanage.model.Reservation;
import com.example.hotelmanage.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository repository;

    public List<Reservation> getAllReservations() {
        return repository.findAll();
    }

    public Optional<Reservation> getReservationById(Integer id) {
        return repository.findById(id);
    }

}
