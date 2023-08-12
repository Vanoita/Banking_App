package com.banking.BankingApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.banking.BankingApp.model.User;
public interface UserRepository extends JpaRepository<User,String> {

}
