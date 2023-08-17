package com.banking.BankingApp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.model.LoginModel;
import com.banking.BankingApp.model.User;
import com.banking.BankingApp.service.UserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
	@Autowired
	UserService userService;

	@PostMapping("/checkLogin")
	public String validateUser(@RequestBody LoginModel u) {
		return userService.validateUser(u);
	}

	@PostMapping("/registerUser")
	public User registerUser(@RequestBody @Valid User cust) {
		return userService.registerUser(cust);
	}
}

