package com.banking.BankingApp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.User;

public interface UserRepository extends JpaRepository<User,String> {
	@Query("SELECT u from User u where u.userId=?1")
	public User fetchUser(String userId);
}
