package com.example.hotelmanage.repository;

import com.example.hotelmanage.model.Reservation;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;


public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    List<Reservation> findByCustomer_Id(Integer userId);

    @Query(value = "SELECT r.room.id FROM Reservation r WHERE r.start < ?2 AND r.end > ?1")
    List<Integer> findReservedRoomsId (LocalDateTime start, LocalDateTime end);

    List<Reservation> findAllByCustomerId(Integer userId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Reservation WHERE customer.id = ?1")
    public void deleteUserReservations(Integer userId);
}
