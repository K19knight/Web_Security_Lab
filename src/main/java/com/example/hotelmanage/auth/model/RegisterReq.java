package com.example.hotelmanage.auth.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterReq {

    private String name;
    private String surname;
    private String email;
    private String password;

}
