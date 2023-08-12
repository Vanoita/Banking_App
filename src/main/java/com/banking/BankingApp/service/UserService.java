package com.banking.BankingApp.service;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import com.banking.BankingApp.dao.UserRepository;
import com.banking.BankingApp.model.LoginModel;
import com.banking.BankingApp.model.User;

@Service
public class UserService {
	@Autowired
	UserRepository userRepo;
	
	public User saveUser( User cust) {
		User obj = userRepo.save(cust);
		return obj;
	}

	public String validateUser(LoginModel u) {
		// TODO Auto-generated method stub
		String result = "";
		User user = null;
		Optional<User> obj = userRepo.findById(u.getUsername());
		if(obj.isPresent()) {
			user=obj.get();
		}
		//User user = userRepo.findById(u.getUsername()).get();
		if(user==null) {
			result="Invalid User";
		}else {
			if(u.getPassword().equals(user.getPassword())) {
				result = "Login Success";
			}else {
				result= "Login failed";
			}
		}
		
		return result;
	}

}
