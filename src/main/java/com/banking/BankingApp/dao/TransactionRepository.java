package com.banking.BankingApp.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.banking.BankingApp.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, String>
  {
	@Query(value="SELECT t FROM Transaction t JOIN Account a ON t.accNo = a.accNo WHERE a.userId=?1")
	public List<Transaction> findAllTransactions(String userId);
	
	@Query(value="SELECT t FROM Transaction t")
	public List<Transaction> findAllTransactions();
	
	
	@Query(value="SELECT t FROM Transaction t JOIN Account a ON t.accNo = a.accNo WHERE t.accNo=?1 OR t.receiverAccNo=?1")
	public List<Transaction> findTransactionsByAccNo(String accNo);
	
	@Query(value="SELECT t FROM Transaction t where t.date >=?2 AND t.date<=?3 AND (t.accNo=?1 OR t.receiverAccNo=?1)")
	public List<Transaction> getTransactionsByDate(String accNo,Date startDate,Date endDate);
}