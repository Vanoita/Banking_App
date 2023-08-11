package com.example.Banking.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Banking.model.LoginModel;
import com.example.Banking.model.User;
import com.example.Banking.service.UserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
	@Autowired
	UserService userService;
	
	@GetMapping("/checkLogin")
	public String validateUser(@RequestBody LoginModel u) {
		return userService.validateUser(u);
	}
	
	@PostMapping("/saveUser")
	public User saveUser(@RequestBody @Valid User cust) {
		User c =userService.saveUser(cust);
		return c;
	}

}

