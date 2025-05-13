package com.example.hotelmanage.model.dto;

import com.example.hotelmanage.model.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDto {
    private String email;
    private String name;
    private String surname;

}
