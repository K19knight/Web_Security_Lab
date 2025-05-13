package com.example.hotelmanage.service;

import com.example.hotelmanage.auth.config.CustomUserDetails;
import com.example.hotelmanage.model.User;
import com.example.hotelmanage.model.dto.UpdateUserDto;
import com.example.hotelmanage.model.dto.UserDto;
import com.example.hotelmanage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserDto(
                        user.getId(),
                        user.getEmail(),
                        user.getName(),
                        user.getSurname(),
                        user.getRole()))
                .collect(Collectors.toList());
    }

    public Optional<UserDto> getUserById (Integer id) {
        return userRepository.findById(id)
                .map(user -> new UserDto(
                        user.getId(),
                        user.getEmail(),
                        user.getName(),
                        user.getSurname(),
                        user.getRole()));
    }

    public boolean deleteUser(Integer id) {
        if (userRepository.findById(id).isPresent()) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<User> getUserByIdForJwtFilter(Integer userId) {
        return userRepository.findById(userId);
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<UserDto> updateUser(CustomUserDetails userDetails, Integer userId, UpdateUserDto userDto) {
        if (!userDetails.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Nie masz uprawnień do zmian!");
        }

        Optional<User> existingUserOpt = userRepository.findById(userId);
        if (existingUserOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Użytkownik nie istnieje");
        }
        User user = existingUserOpt.get();
        user.setName(userDto.getName());
        user.setEmail(user.getEmail());
        user.setSurname(user.getSurname());

        User updated = userRepository.save(user);
        return getUserById(updated.getId());
    }
}
