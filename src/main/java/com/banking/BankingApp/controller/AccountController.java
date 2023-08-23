package com.banking.BankingApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.model.Account;

import com.banking.BankingApp.model.Transaction;
import com.banking.BankingApp.service.AccountService;
import com.banking.BankingApp.service.TransactionService;

@RestController
@CrossOrigin("http://localhost:3000")
public class AccountController {
	
	@Autowired
	AccountService accService;
	@Autowired
	TransactionService transService;
	@PostMapping("/createAccount/{userId}")
	public String createAccount(@RequestBody Account account, @PathVariable("userId") String userId) {
		String result="";
		Account acc = accService.createAccount(account, userId);
		if(acc!=null)
			result="Account created";
		else result = "Error in Creating Account";
		return result;
	}
	
	@PostMapping("/checkAccNo/{accNo}")
	public boolean checkAccNo(@PathVariable String accNo) {
		return accService.checkAccNo(accNo);
	}
	
	@PostMapping("/transaction")
	public String transaction(@RequestBody Transaction t) {
		Transaction trans = transService.createTransaction(t);
		String remark = trans.getMode();
		if(remark.equalsIgnoreCase("withdraw"))
		return accService.withdrawFunds(trans);
		else if(remark.equalsIgnoreCase("deposit")) 
			return accService.addFunds(trans);
		else return accService.transferFunds(trans);
	}
	
	@GetMapping("/fetchAllAccount/{userId}")
	public List<Account> fetchAllAccount(@PathVariable String userId){
		List<Account> obj = accService.fetchAllAccount(userId);
		return obj;
	}
	
	@GetMapping("/fetchAllAccounts")
	public List<Account> fetchAllAccount(){
		List<Account> obj = accService.fetchAllAccount();
		return obj;
	}	
	
	@GetMapping("/fetchAccNo/{userId}")
	public List<String> fetchAccNo(@PathVariable("userId") String userId) {
		return accService.fetchAccNo(userId);
	}
	
	@GetMapping("/fetchUserId/{accNo}")
	public String fetchUserId(@PathVariable("accNo") String accNo) {
		return accService.fetchUserId(accNo);
	}
	
	@GetMapping("/toggleDisable/{accNo}")
	public String toggleDisable(@PathVariable String accNo) {
		
		String result =  accService.toggleDisable(accNo);
		return result;
	}

}
