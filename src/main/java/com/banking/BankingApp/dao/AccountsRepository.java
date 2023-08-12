package com.banking.BankingApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.banking.BankingApp.model.Accounts;

public interface AccountsRepository extends JpaRepository<Accounts, String>{

}