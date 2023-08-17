package com.banking.BankingApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.dao.UserRepository;
import com.banking.BankingApp.model.Account;
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
}
