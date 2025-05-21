package com.example.hotelmanage.repository;

import com.example.hotelmanage.model.Reservation;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class UnsecureReservationRepository {
    @PersistenceContext
    private EntityManager em;

    @Transactional
    public List<Reservation> findByRawReservationId(String reservationIdRaw) {
        String query = "SELECT * FROM reservation WHERE id = " + reservationIdRaw;
        return em.createNativeQuery(query, Reservation.class).getResultList();
    }
}
