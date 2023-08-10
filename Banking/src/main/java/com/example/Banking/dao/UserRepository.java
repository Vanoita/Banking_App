package com.example.Banking.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Banking.model.User;
public interface UserRepository extends JpaRepository<User,String> {

}
