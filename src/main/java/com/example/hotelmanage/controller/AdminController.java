package com.example.hotelmanage.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {
}
