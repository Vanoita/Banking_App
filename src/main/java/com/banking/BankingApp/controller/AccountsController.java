package com.banking.BankingApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.banking.BankingApp.model.Accounts;
import com.banking.BankingApp.service.AccountService;

@Controller
@CrossOrigin("https://localhost:3000")
public class AccountsController {
		@Autowired
		AccountService accService;
		@PostMapping("/createAccount/{uname}")
		public String createAccount(@RequestBody Accounts account,@PathVariable("uname") String userId) {
			String result="null";
			Accounts acc = accService.createAccount(account,userId);
			if(acc!=null)
				result="Account created";
			return result;
		}
}
