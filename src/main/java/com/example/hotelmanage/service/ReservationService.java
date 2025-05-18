package com.example.hotelmanage.service;

import com.example.hotelmanage.auth.config.CustomUserDetails;
import com.example.hotelmanage.model.Reservation;
import com.example.hotelmanage.model.Room;
import com.example.hotelmanage.model.User;
import com.example.hotelmanage.model.dto.MyReservationDto;
import com.example.hotelmanage.model.dto.ReservationDto;
import com.example.hotelmanage.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    private RoomService roomService;

    public List<Reservation> getAllReservations() {
        return repository.findAll();
    }

    public Optional<Reservation> getReservationById(Integer id) {
        return repository.findById(id);
    }

    public void deleteUserReservations(Integer userId){
        repository.deleteUserReservations(userId);
    }

    public ResponseEntity<?> getMyReservations(CustomUserDetails userDetails) {
        Integer userId = userDetails.getUser().getId();

        List<Reservation> reservations = repository.findAllByCustomerId(userId);

        List<MyReservationDto> result = reservations.stream().map(res -> {
            Room room = res.getRoom();
            return new MyReservationDto(
                    res.getId(),
                    res.getStart(),
                    res.getEnd(),
                    res.getGuests(),
                    res.getPrice(),
                    room.getId(),
                    room.getSize(),
                    room.getMaxGuests(),
                    room.getPricePerOneNight()
            );
        }).toList();

        return ResponseEntity.ok(result);
    }
    public boolean cancelReservation(Integer reservationId) {
        if (repository.findById(reservationId).isPresent()){
            repository.deleteById(reservationId);
            return true;
        }
        return false;
    }

    public ResponseEntity<?> cancelMyReservation(Integer reservationId, CustomUserDetails userDetails){
        Optional<Reservation> reservationOpt = repository.findById(reservationId);

        if (reservationOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Rezerwacja nie została znaleziona."));
        }
        Reservation reservation = reservationOpt.get();

        if (!userDetails.getUser().getId().equals(reservation.getCustomer().getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Rezerwacja nie należy do danego użytkownika!");
        }
        repository.delete(reservation);
        return ResponseEntity.ok(Map.of("message", "Rezerwacja została anulowana."));
    }

    public ResponseEntity<?> makeReservation(ReservationDto reservationDto, CustomUserDetails userDetails) {
        if (!userDetails.getUser().getId().equals(reservationDto.getUserId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Nie mozna zrobic rezerwacji dla innego uzytkownika!");
        }

        Optional<User> userOpt = userService.getFullUserById(reservationDto.getUserId());
        Optional<Room> roomOpt = roomService.getRoomById(reservationDto.getRoomId());

        if(userOpt.isEmpty() || roomOpt.isEmpty())
            return ResponseEntity.notFound().build();
        Room room = roomOpt.get();
        User user = userOpt.get();

        List<Integer> reservedRooms = repository.findReservedRoomsId(
                reservationDto.getStart(), reservationDto.getEnd()
        );

        if(reservedRooms.contains(room.getId())){
            Map<String, String> error = new HashMap<>();
            error.put("message", "Pokój jest niedostępny w wybranym terminie.");

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(error);
        }
        if (reservationDto.getGuests() == null || reservationDto.getGuests() > room.getMaxGuests()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Liczba gości przekracza dopuszczalny limit dla tego pokoju (" + room.getMaxGuests() + ").");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
        Reservation reservation = Reservation.builder()
                .customer(user)
                .room(room)
                .end(reservationDto.getEnd())
                .start(reservationDto.getStart())
                .price(reservationDto.getPrice())
                .guests(reservationDto.getGuests())
                .build();
        repository.save(reservation);

        return ResponseEntity.ok(reservation);
    }


}
