package com.example.Banking.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Banking.model.Accounts;

public interface AccountsRepository extends JpaRepository<Accounts, String>{

}
