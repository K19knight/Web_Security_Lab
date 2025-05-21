package com.example.hotelmanage.repository;

import com.example.hotelmanage.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class UnsecureUserRepository {
    @PersistenceContext
    private EntityManager em;

    @Transactional
    public List<User> findByRawQuery(String email, String password) {
        String query = "SELECT * FROM user WHERE email = '" + email + "' AND password = '" + password + "'";
        return em.createNativeQuery(query, User.class).getResultList();
    }
}
