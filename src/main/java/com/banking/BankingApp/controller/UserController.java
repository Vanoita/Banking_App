package com.banking.BankingApp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
<<<<<<< HEAD

import org.springframework.web.bind.annotation.GetMapping;

=======
import org.springframework.web.bind.annotation.GetMapping;
>>>>>>> 950ff7f0e4060c48641dda9ec99bcf21d04a4188
import org.springframework.web.bind.annotation.PathVariable;
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
	
<<<<<<< HEAD

	@PostMapping("/checkUserId/{userId}")
	public boolean checkUserID(@PathVariable String userId) {
		return userService.checkUserId(userId);
	}
	
	@PostMapping("/createNewPassword/{refId}")
	public String createNewPassword(@PathVariable String refId,@RequestBody String password) {
		if(refId.length()==12)
			return userService.changePasswordByAccNo(refId,password);
		else return userService.changePasswordByUserId(refId,password);
	}
=======
>>>>>>> 950ff7f0e4060c48641dda9ec99bcf21d04a4188
	@GetMapping("/fetchUser/{userId}")
	public User fetchUser(@PathVariable String userId){
		User obj = userService.fetchUser(userId);
		return obj;
<<<<<<< HEAD

=======
>>>>>>> 950ff7f0e4060c48641dda9ec99bcf21d04a4188
	}
}

