package com.banking.BankingApp.controller;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.DateFilter;
import com.banking.BankingApp.model.Transaction;
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
	
	@PostMapping("/checkAccNo/{accNo}")
	public boolean checkAccNo(@PathVariable String accNo) {
		return accService.checkAccNo(accNo);
	}
	
	@PostMapping("/transaction")
	public String transaction(@RequestBody Transaction t) {
		Transaction trans = accService.createTransaction(t);
		String remark = trans.getMode();
		if(remark.equalsIgnoreCase("withdraw"))
		return accService.withdrawFunds(trans);
		else if(remark.equalsIgnoreCase("deposit")) 
			return accService.addFunds(trans);
		else return accService.transferFunds(trans);
	}
	
	@GetMapping("/getTransactions/{userId}")
	public List<Transaction> getTransactions(@PathVariable String userId){
		List<Transaction> obj = accService.getAllTransactions(userId);
		return obj;
	}
	
	@GetMapping("/getTransactionsByAccNo/{accNo}")
	public List<Transaction> getTransactionsByAccNo(@PathVariable String accNo){
		List<Transaction> obj = accService.getTransactionsByAccNo(accNo);
		return obj;
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
	
	@GetMapping("/getAllTransactions")
	public List<Transaction> getAllTransactions() {
		List<Transaction> obj = accService.getAllTransactions();
		return obj;
	}
	
	@PostMapping("/getTransactionsByDate")
	public List<Transaction> getTransactionsByDate(@RequestBody DateFilter date) throws ParseException {
		List<Transaction> t = accService.getTransactionsByDate(date.getAccNo(),date.getStartDate(),date.getEndDate());
		return t;
	}	
	
	@GetMapping("/fetchAccNo/{userId}")
	public List<String> fetchAccNo(@PathVariable("userId") String userId) {
		return accService.fetchAccNo(userId);
	}
	
	@GetMapping("/toggleDisable/{accNo}")
	public String toggleDisable(@PathVariable String accNo) {
		
		String result =  accService.toggleDisable(accNo);
		return result;
	}

}