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
		String res = "";
		User user = null;
		Optional<User> obj = userRepo.findById(u.getUsername());
		if(obj.isPresent()) {
			user=obj.get();
		}
		if(user==null) {
			res = "{'login': false, 'message' = 'Wrong Username!'}";
		}else {
			if(u.getPassword().equals(user.getPassword())) {
				User user2 = userRepo.findById(u.getUsername()).get();
				res = "{'login': true, 'message' = 'Login Successfully!', 'name': "+user2.getFirstName()+" "+user2.getMiddleName()+" "+user2.getLastName()+"}";
			}else {
				res = "{'login': false, 'message' = 'Incorrect Password!'}";
			}
		}
		return res;
	}

}

