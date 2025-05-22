package com.example.hotelmanage.service;

import com.example.hotelmanage.model.Room;
import com.example.hotelmanage.model.dto.RoomDto;
import com.example.hotelmanage.model.dto.RoomFilterDto;
import com.example.hotelmanage.repository.ReservationRepository;
import com.example.hotelmanage.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ReservationRepository reservationRepository;
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
                .description(newRoom.getDescription())
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

    public Room editRoom(Integer roomId, RoomDto editRoom) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        room.setSize(editRoom.getSize());
        room.setMaxGuests(editRoom.getMaxGuests());
        room.setPricePerOneNight(editRoom.getPricePerOneNight());
        return roomRepository.save(room);
    }

    public List<Room> getAvailable(RoomFilterDto roomDto) {
        List<Room> matchingRooms = roomRepository.findMatchingRooms(
                roomDto.getSize(), roomDto.getGuests(), roomDto.getPricePerOneNight()
        );

        List<Integer> reservedRoomsIds = reservationRepository.findReservedRoomsId(roomDto.getStart(), roomDto.getEnd());

        List<Room> availableRooms = new ArrayList<>();

        for (Room room: matchingRooms){
            if(!reservedRoomsIds.contains(room.getId())){
                availableRooms.add(room);
            }
        }

        return availableRooms;
    }
}
