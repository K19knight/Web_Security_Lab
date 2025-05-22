package com.example.hotelmanage.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Room {

    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private Integer size;

    @Column(nullable = false)
    private Integer maxGuests;

    @Column(nullable = false)
    private Integer pricePerOneNight;

    @Column(columnDefinition = "TEXT")
    private String description;
}
