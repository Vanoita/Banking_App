package com.banking.BankingApp.service;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.UserRepository;
import com.banking.BankingApp.model.LoginModel;
import com.banking.BankingApp.model.User;


@Service
public class UserService {
	
	@Autowired
	UserRepository userRepo;
	
	public User registerUser(User u) {
		return userRepo.save(u);
	}
	
	

	public String validateUser(LoginModel u) {
		// TODO Auto-generated method stub
		String res = "";
		User user = null;
		Optional<User> obj = userRepo.findById(u.getUserId());
		if(obj.isPresent()) {
			user=obj.get();		
		}
		if(user==null) {
			res = "{\"login\": false, \"message\": \"Wrong Username!\"}";
		}else {
			if(u.getPassword().equals(user.getPassword())) {
				//CreateAccount user2 = registerRepo.findById(u.getUserId()).get();
				res = "{\"login\": true, \"message\": \"Login Successfully!\"}";
			}else {
				res = "{\"login\": false, \"message\": \"Incorrect Password!\"}";
			}
		}
		return res;
	}
	
	public User fetchUser(String userId){
		return userRepo.fetchUser(userId);
	}

}

