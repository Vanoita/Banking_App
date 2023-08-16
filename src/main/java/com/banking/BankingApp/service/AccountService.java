package com.banking.BankingApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.AccountsRepository;
import com.banking.BankingApp.dao.RegisterUserRepository;
import com.banking.BankingApp.dao.UserRepository;
import com.banking.BankingApp.model.Accounts;
import com.banking.BankingApp.model.CreateAccount;
import com.banking.BankingApp.model.RegisterUser;

@Service
public class AccountService {
	@Autowired
	RegisterUserRepository userRepo;
	@Autowired
	AccountsRepository accRepo;
	
	public Accounts createAccount(Accounts account, String userId) {
		RegisterUser u = userRepo.findById(userId).get();
		account.setUserId(u.getUserId());
		return accRepo.save(account);
	}
}
