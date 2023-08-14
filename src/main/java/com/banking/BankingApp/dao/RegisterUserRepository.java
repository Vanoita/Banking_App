package com.banking.BankingApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.banking.BankingApp.model.RegisterUser;

public interface RegisterUserRepository extends JpaRepository<RegisterUser,String> {

}
