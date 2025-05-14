package com.example.hotelmanage.repository;

import com.example.hotelmanage.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository <Room, Integer> {

    @Query(value = "SELECT r FROM Room r WHERE (?1 is NULL OR ?1 <= r.size) " +
            "AND (?2 is NULL OR ?2 >= r.maxGuests) " +
            "AND (?3 is NULL OR ?3 >= r.pricePerOneNight)")
    List<Room> findMatchingRooms(Integer size, Integer guests, Integer price);

}
