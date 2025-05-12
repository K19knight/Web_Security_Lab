package com.example.hotelmanage.repository;

import com.example.hotelmanage.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    List<Reservation> findByCustomer_Id(Integer userId);
}
