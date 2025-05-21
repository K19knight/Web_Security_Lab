package com.example.hotelmanage.auth.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthReq {

    @NotBlank(message = "Email jest wymagany")
    @Email(message = "Niepoprawny format email")
    private String email;

    @NotBlank(message = "Hasło jest wymagane")
    private String password;

}
