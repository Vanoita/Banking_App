package com.banking.BankingApp.controller;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.model.DateFilter;
import com.banking.BankingApp.model.Transaction;
import com.banking.BankingApp.service.TransactionService;

@RestController
@CrossOrigin("http://localhost:3000")
public class TransactionController {
	@Autowired
	TransactionService transService;
	
	@GetMapping("/getTransactions/{userId}")
	public List<Transaction> getTransactions(@PathVariable String userId){
		List<Transaction> obj = transService.getAllTransactions(userId);
		return obj;
	}
	
	@GetMapping("/getTransactionsByAccNo/{accNo}")
	public List<Transaction> getTransactionsByAccNo(@PathVariable String accNo){
		List<Transaction> obj = transService.getTransactionsByAccNo(accNo);
		return obj;
	}
	
	@GetMapping("/getAllTransactions")
	public List<Transaction> getAllTransactions() {
		List<Transaction> obj = transService.getAllTransactions();
		return obj;
	}
	
	@PostMapping("/getTransactionsByDate")
	public List<Transaction> getTransactionsByDate(@RequestBody DateFilter date) throws ParseException {
		List<Transaction> t = transService.getTransactionsByDate(date.getAccNo(),date.getStartDate(),date.getEndDate());
		return t;
	}	
	
	@GetMapping("/getTotalTransactions")
	public int getTotalTransactions() {
		int res = transService.getTotalTransactions();
		return res;
	}
	
	@GetMapping("/getAverageTransactionAmount")
	public int getAverageTransactionAmount() {
		int res = transService.getAverageTransactionAmount();
		return res;
	}
}
