package com.example.hotelmanage.controller;

import com.example.hotelmanage.model.Room;
import com.example.hotelmanage.model.dto.RoomDto;
import com.example.hotelmanage.model.dto.RoomFilterDto;
import com.example.hotelmanage.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Room>> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/{roomId:\\d}")
    public ResponseEntity<Room> getRoomById(@PathVariable Integer roomId) {
        return roomService.getRoomById(roomId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Room> addRoom(@RequestBody RoomDto newRoom) {
        Room room = roomService.addRoom(newRoom);
        return new ResponseEntity<>(room, HttpStatus.CREATED);
    }

    @DeleteMapping("/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseBody
    public boolean deleteRoomById(@PathVariable Integer roomId) {
        return roomService.deleteRoom(roomId);
    }

    @PutMapping("/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Room> editRoom(@PathVariable Integer roomId, @RequestBody RoomDto editRoom) {
        Room room = roomService.editRoom(roomId, editRoom);
        return ResponseEntity.ok(room);
    }
    @PostMapping("/getAvailable")
    public ResponseEntity<List<Room>> getAvailableRooms(@RequestBody RoomFilterDto roomDto) {
        List<Room> rooms = roomService.getAvailable(roomDto);
        return ResponseEntity.ok(rooms);
    }

}
