package com.example.hotelmanage.repository;

import com.example.hotelmanage.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository <Room, Integer> {

}
