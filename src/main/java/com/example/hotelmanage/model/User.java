package com.example.hotelmanage.model;

import com.example.hotelmanage.model.enums.UserType;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String surname;

    @Column(columnDefinition = "boolean default 1")
    private Boolean nonBlocked;

    @Column
    private Integer blockDuration;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserType role;

}
