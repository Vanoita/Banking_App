package com.banking.BankingApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.banking.BankingApp.model.AdminUser;

public interface AdminUserRepository extends JpaRepository<AdminUser,String>{
	@Query("SELECT u from AdminUser u where u.userId=?1")
	public AdminUser fetchAdminUser(String userId);
}
