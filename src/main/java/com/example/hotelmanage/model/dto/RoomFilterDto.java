package com.example.hotelmanage.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomFilterDto {

    private LocalDateTime start;

    private LocalDateTime end;

    private Integer size;

    private Integer guests;

    private Integer pricePerOneNight;

}
