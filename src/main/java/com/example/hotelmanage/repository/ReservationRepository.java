package com.example.hotelmanage.repository;

import com.example.hotelmanage.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;


public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    List<Reservation> findByCustomer_Id(Integer userId);

    @Query(value = "SELECT r.room.id FROM Reservation r WHERE r.start < ?2 AND r.end > ?1")
    List<Integer> findReservedRoomsId (LocalDateTime start, LocalDateTime end);

}
