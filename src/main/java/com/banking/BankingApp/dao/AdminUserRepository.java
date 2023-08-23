package com.banking.BankingApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.banking.BankingApp.model.AdminUser;

public interface AdminUserRepository extends JpaRepository<AdminUser,String>{

}
