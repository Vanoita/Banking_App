package com.banking.BankingApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.banking.BankingApp.model.CreateAccount;

public interface UserRepository extends JpaRepository<CreateAccount,String> {

}
