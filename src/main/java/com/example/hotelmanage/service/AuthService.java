package com.example.hotelmanage.service;

import com.example.hotelmanage.auth.config.CustomJwtService;
import com.example.hotelmanage.auth.config.CustomUserDetails;
import com.example.hotelmanage.auth.model.AuthReq;
import com.example.hotelmanage.auth.model.AuthRes;
import com.example.hotelmanage.auth.model.RegisterReq;
import com.example.hotelmanage.model.User;
import com.example.hotelmanage.model.dto.ChangePasswordDto;
import com.example.hotelmanage.model.enums.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Map;

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

    private final Integer MAX_FAILED_ATTEMPTS = 5;
    private final Duration BLOCK_TIME = Duration.ofMinutes(15);

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
        User user = userService.getUserByEmail(request.getEmail());
        if (user.getNonBlocked() != null && !user.getNonBlocked()) {
            LocalDateTime now = LocalDateTime.now();
            if (user.getBlockDuration() != null && user.getBlockDuration().isAfter(now)) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy, HH:mm", new Locale("pl"));
                String formattedDate = user.getBlockDuration().format(formatter);
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Twoje konto zostało zablokowane do " + formattedDate);
            } else {
                user.setNonBlocked(true);
                user.setFailedLoginAttempts(0);
                user.setBlockDuration(null);
                userService.saveUser(user);
            }
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            processFailedLogin(user);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nieprawidłowy email lub hasło");
        } catch (LockedException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Twoje Konto zostało zablokowane");
        }
        resetFailedAttempts(user);

        CustomUserDetails userDetails = new CustomUserDetails();
        userDetails.setUser(user);
        String token = jwtService.generateToken(userDetails);
        return AuthRes.builder().token(token).build();
    }

    private void processFailedLogin(User user) {
        int attempts = (user.getFailedLoginAttempts() == null) ? 0 : user.getFailedLoginAttempts();
        attempts++;
        user.setFailedLoginAttempts(attempts);

        if (attempts >= MAX_FAILED_ATTEMPTS) {
            user.setNonBlocked(false);
            user.setBlockDuration(LocalDateTime.now().plus(BLOCK_TIME));
        }
        userService.saveUser(user);
    }

    private void resetFailedAttempts(User user) {
        user.setFailedLoginAttempts(0);
        userService.saveUser(user);
    }

    public ResponseEntity<?> changePassword(CustomUserDetails userDetails, ChangePasswordDto passwordDto) {
        User user = userDetails.getUser();

        if (!passwordEncoder.matches(passwordDto.getOldPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Stare hasło jest nieprawidłowe."));
        }

        user.setPassword(passwordEncoder.encode(passwordDto.getNewPassword()));
        userService.saveUser(user);

        return ResponseEntity.ok(Map.of("message", "Hasło zostało zmienione."));
    }

}
