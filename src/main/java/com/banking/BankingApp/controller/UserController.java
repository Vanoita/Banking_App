package com.banking.BankingApp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.model.LoginModel;
import com.banking.BankingApp.model.RegisterUser;
import com.banking.BankingApp.model.Accounts;
import com.banking.BankingApp.model.CreateAccount ;
import com.banking.BankingApp.service.AccountService;
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
	
	@Autowired
	AccountService accService;
	@PostMapping("/createAccount/{userId}")
	public String createAccount(@RequestBody Accounts account, @PathVariable("userId") String userId) {
		String result="null";
		Accounts acc = accService.createAccount(account, userId);
		if(acc!=null)
			result="Account created";
		return result;
	}

	@PostMapping("/registerUser")
	public RegisterUser registerUser(@RequestBody @Valid RegisterUser cust) {
		RegisterUser c =userService.registerUser(cust);
		return c;
	}
}

