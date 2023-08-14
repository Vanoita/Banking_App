package com.banking.BankingApp.service;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.RegisterUserRepository;
import com.banking.BankingApp.dao.UserRepository;
import com.banking.BankingApp.model.CreateAccount;
import com.banking.BankingApp.model.LoginModel;
import com.banking.BankingApp.model.RegisterUser;


@Service
public class UserService {
	
	@Autowired
	RegisterUserRepository registerRepo;
	
	public RegisterUser registerUser(RegisterUser u) {
		RegisterUser obj = registerRepo.save(u);
		return obj;
	}
	
	

	public String validateUser(LoginModel u) {
		// TODO Auto-generated method stub
		String res = "";
	 RegisterUser user = null;
		Optional<RegisterUser> obj = registerRepo.findById(u.getUsername());
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

}

