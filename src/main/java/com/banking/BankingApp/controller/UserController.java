package com.banking.BankingApp.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.exception.ResourceNotFoundException;
import com.banking.BankingApp.model.AdminUser;
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
	
	@PostMapping("/checkAdminLogin")
	public String validateAdminUser(@RequestBody LoginModel u) {
		return userService.validateAdminUser(u);
	}
	
	@PostMapping("/registerUser")
	public User registerUser(@RequestBody @Valid User cust) {
		return userService.registerUser(cust);
	}
	
	@PostMapping("/registerAdminUser")
	public AdminUser registerAdminUser(@RequestBody @Valid AdminUser cust) {
		return userService.registerAdminUser(cust);
	}
	@GetMapping("/fetchAllUsers")
	public List<User> fetchAllUsers() {
		List<User> obj = userService.fetchAllUsers();
		return obj;
	}


	@PostMapping("/checkUserId/{userId}")
	public boolean checkUserID(@PathVariable String userId) throws ResourceNotFoundException {
		return userService.checkUserId(userId);
	}
	
	@PostMapping("/createNewPassword/{refId}")
	public String createNewPassword(@PathVariable String refId,@RequestBody String password) {
		if(refId.length()==12)
			return userService.changePasswordByAccNo(refId,password);
		else return userService.changePasswordByUserId(refId,password);
	}

	@GetMapping("/fetchUser/{userId}")
	public User fetchUser(@PathVariable String userId){
		User obj = userService.fetchUser(userId);
		return obj;	
	}
	
	@GetMapping("/fetchAdminUser/{userId}")
	public AdminUser fetchAdminUser(@PathVariable String userId){
		AdminUser obj = userService.fetchAdminUser(userId);
		return obj;	
	}
	
	@GetMapping("/getTotalUsers")
	public int getTotalUsers() {
		int res = userService.getTotalUsers();
		return res;
	}
}

