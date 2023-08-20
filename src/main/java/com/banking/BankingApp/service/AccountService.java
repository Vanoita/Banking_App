package com.banking.BankingApp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.dao.TransactionRepository;
import com.banking.BankingApp.dao.UserRepository;
import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.Transaction;
import com.banking.BankingApp.model.User;

@Service
public class AccountService {
	@Autowired
	UserRepository userRepo;
	@Autowired
	AccountRepository accRepo;
	@Autowired
	TransactionRepository transRepo;
	
	public Account createAccount(Account acc, String userId) {
		User u = userRepo.findById(userId).get();
		acc.setUserId(u.getUserId());
		return accRepo.save(acc);
	}
	
	public Transaction createTransaction(Transaction transaction) {
		return transRepo.save(transaction);
	}
	
	public boolean checkAccNo(String accNo) {
		boolean result = false;
		Optional<Account> a = accRepo.findById(accNo);
		if(a.isPresent())
			result = true;
		return result;
	}
	
	@Transactional
	public String withdrawFunds(Transaction transaction) {
		String result="";
		String acc = transaction.getAccNo();
		Account account = accRepo.findById(acc).get();
		double balance = account.getBalance();
		double withdrawAmount = transaction.getAmount();
				if(balance-withdrawAmount<1000)
			result = "Insufficient funds";
		else {
			int rowsAffected = accRepo.updateBalance(withdrawAmount,acc);
			if(rowsAffected>0)
				result="Transaction Successful";
					}
				return result;
	}
	
	@Transactional
	public String addFunds(Transaction transaction) {
		String result="";
		String acc=transaction.getAccNo();
		double depositAmount = -1*transaction.getAmount();
		int rowsAffected = accRepo.updateBalance(depositAmount,acc);
		if(rowsAffected>0)
			result="Transaction Successful";
		return result;
	}
	
	
	@Transactional
	public String transferFunds(Transaction transaction) {
		String result="Not Transacted";
		String senderAcc = transaction.getAccNo();
		String receiverAcc = transaction.getReceiverAccNo();
		Account account = accRepo.findById(senderAcc).get();		
		double senderBalance = account.getBalance();
		double amount = transaction.getAmount();
		if(senderBalance-amount<1000)
			result = "Insufficient funds";
		else {
			int rowsAffected_1 = accRepo.updateBalance(amount,senderAcc);
			int rowsAffected_2 = accRepo.updateBalance(-1*amount, receiverAcc);
			if(rowsAffected_1>0)
				result="Transaction Successful";
		}
		return result;
	}
	
	

	public List<Transaction> getAllTransactions(String userId){
		return transRepo.findAllTransactions(userId);
	}
}
