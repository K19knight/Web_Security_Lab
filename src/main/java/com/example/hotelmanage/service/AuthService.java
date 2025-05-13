package com.example.hotelmanage.service;

import com.example.hotelmanage.auth.config.CustomJwtService;
import com.example.hotelmanage.auth.config.CustomUserDetails;
import com.example.hotelmanage.auth.model.AuthReq;
import com.example.hotelmanage.auth.model.AuthRes;
import com.example.hotelmanage.auth.model.RegisterReq;
import com.example.hotelmanage.model.User;
import com.example.hotelmanage.model.enums.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomJwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthRes register(RegisterReq request) {
        User existingUser = userService.getUserByEmail(request.getEmail());
        if (existingUser != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Użytkownik o padnym adresie e-mail już istnieje");
        }

        User user = User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .surname(request.getSurname())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserType.USER)
                .nonBlocked(true)
                .build();

        userService.saveUser(user);
        CustomUserDetails userDetails = new CustomUserDetails();
        userDetails.setUser(user);
        String token = jwtService.generateToken(userDetails);
        return AuthRes.builder().token(token).build();
    }

    public AuthRes login(AuthReq request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nieprawidłowy email lub hasło");
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
        }

        User user = userService.getUserByEmail(request.getEmail());
        CustomUserDetails userDetails = new CustomUserDetails();
        userDetails.setUser(user);
        String token = jwtService.generateToken(userDetails);
        return AuthRes.builder().token(token).build();
    }

}
