package com.banking.BankingApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.service.AccountService;

@RestController
@CrossOrigin("http://localhost:3000")
public class AccountController {
	
	@Autowired
	AccountService accService;
	@PostMapping("/createAccount/{userId}")
	public String createAccount(@RequestBody Account account, @PathVariable("userId") String userId) {
		String result="";
		Account acc = accService.createAccount(account, userId);
		if(acc!=null)
			result="Account created";
		else result = "Error in Creating Account";
		return result;
	}
}
