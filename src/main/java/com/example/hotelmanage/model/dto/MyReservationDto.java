package com.example.hotelmanage.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyReservationDto {
    private Integer reservationId;
    private LocalDateTime start;
    private LocalDateTime end;
    private Integer guests;
    private Integer price;

    private Integer roomId;
    private Integer roomSize;
    private Integer maxGuests;
    private Integer pricePerOneNight;
}
