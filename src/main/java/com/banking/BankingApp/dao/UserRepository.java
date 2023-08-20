package com.banking.BankingApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.banking.BankingApp.model.User;

public interface UserRepository extends JpaRepository<User,String> {
	
	@Modifying
	@Query("update User user set user.password=?2 where user.userId=?1")
	public int updatePassword(String userId,String password);
}
