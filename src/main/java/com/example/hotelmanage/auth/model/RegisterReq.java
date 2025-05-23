package com.example.hotelmanage.auth.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterReq {

    @NotBlank(message = "Imię nie może być puste")
    private String name;

    @NotBlank(message = "Nazwisko nie może być puste")
    private String surname;

    @Email(message = "Niepoprawny format adresu e-mail")
    @NotBlank(message = "E-mail nie może być pusty")
    private String email;

    @NotBlank(message = "Hasło nie może być puste")
    @Size(min = 8, message = "Hasło musi mieć co najmniej 8 znaków")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}:;\"'<>,.?/]).+$",
            message = "Hasło musi zawierać wielką literę, małą literę, cyfrę oraz znak specjalny"
    )
    private String password;

}
