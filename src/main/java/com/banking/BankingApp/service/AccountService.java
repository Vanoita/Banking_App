package com.banking.BankingApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.banking.BankingApp.dao.AccountRepository;
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
	
	public Account createAccount(Account acc, String userId) {
		User u = userRepo.findById(userId).get();
		acc.setUserId(u.getUserId());
		return accRepo.save(acc);
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
}
