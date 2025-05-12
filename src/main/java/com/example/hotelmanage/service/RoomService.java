package com.example.hotelmanage.service;

import com.example.hotelmanage.model.Room;
import com.example.hotelmanage.model.dto.RoomDto;
import com.example.hotelmanage.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Integer id) {
        return roomRepository.findById(id);
    }

    public Room addRoom(RoomDto newRoom){
        Room room = Room.builder()
                .size(newRoom.getSize())
                .maxGuests(newRoom.getMaxGuests())
                .pricePerOneNight(newRoom.getPricePerOneNight())
                .build();
        return roomRepository.save(room);
    }

    public boolean deleteRoom(Integer id) {
        if (roomRepository.findById(id).isPresent()) {
            roomRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
