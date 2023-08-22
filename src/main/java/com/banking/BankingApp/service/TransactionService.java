package com.banking.BankingApp.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.TransactionRepository;
import com.banking.BankingApp.model.Transaction;

@Service
public class TransactionService {
	@Autowired
	TransactionRepository transRepo;
	
	public Transaction createTransaction(Transaction transaction) {
		return transRepo.save(transaction);
	}
	

	public List<Transaction> getAllTransactions(String userId){
		return transRepo.findAllTransactions(userId);
	}
	
	public List<Transaction> getAllTransactions(){
		return transRepo.findAllTransactions();
	}
	

	public List<Transaction> getTransactionsByAccNo(String accNo){
		return transRepo.findTransactionsByAccNo(accNo);
	}
	
	public List<Transaction> getTransactionsByDate(String accNo,String startDate, String endDate) throws ParseException {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date fstartDate = df.parse(startDate);
		Date fendDate = df.parse(endDate);
		List<Transaction> transactionList = transRepo.getTransactionsByDate(accNo,fstartDate,fendDate);
		return transactionList;
	}
	
	public int getTotalTransactions() {
		return transRepo.getTotalTransactions();
	}
	
	public int getAverageTransactionAmount() {
		return transRepo.getAverageTransactionAmount();
	}
}
