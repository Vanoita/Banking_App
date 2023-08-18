package com.banking.BankingApp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.banking.BankingApp.model.Account;

public interface AccountRepository extends JpaRepository<Account, String>{
	@Modifying 
	@Query("update Account account set account.balance=account.balance-?1 where account.accNo=?2")
	public int updateBalance(double amount,String accountNo);
	
	@Query("SELECT accNo from Account acc where acc.userId=?1")
	public List<String> fetchAccNo(String userId);
	
	
}