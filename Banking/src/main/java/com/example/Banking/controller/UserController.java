package com.example.Banking.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Banking.model.User;
import com.example.Banking.service.UserService;

@RestController
@CrossOrigin("https://localhost:3000")
public class UserController {
	@Autowired
	UserService userService;
	
	@PostMapping("/saveUser")
	public User saveUser(@RequestBody User cust) {
		User c =userService.saveUser(cust);
		return c;
	}

}

