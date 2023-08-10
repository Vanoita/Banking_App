package com.example.Banking.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Banking.dao.UserRepository;
import com.example.Banking.model.User;

@Service


public class UserService {
	
	@Autowired
	UserRepository userRepo;
	
	public User saveUser( User cust) {
		User obj = userRepo.save(cust);
		return obj;
	}

}

