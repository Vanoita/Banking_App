package com.banking.BankingApp.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.banking.BankingApp.dao.AccountRepository;
import com.banking.BankingApp.dao.AdminUserRepository;
import com.banking.BankingApp.dao.UserRepository;
import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.AdminUser;
import com.banking.BankingApp.model.LoginModel;
import com.banking.BankingApp.model.User;


@Service
public class UserService {
	
	@Autowired
	UserRepository userRepo;
	@Autowired
	AccountRepository accRepo;
	@Autowired
	AdminUserRepository adminUserRepo;
	
	public User registerUser(User u) {
		return userRepo.save(u);
	}
	
	public AdminUser registerAdminUser(AdminUser u) {
		return adminUserRepo.save(u);
	}
	
	public String validateUser(LoginModel u) {
		
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
	
public String validateAdminUser(LoginModel u) {
		System.out.println(u.getPassword()+","+u.getUserId());
		String res = "";
		AdminUser user=null;
		Optional<AdminUser> obj = adminUserRepo.findById(u.getUserId());

		if(obj.isPresent()) {
			user=obj.get();	
			System.out.println("userid found");
		}
		if(user==null) {
			System.out.println("null");
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
	


	public boolean checkUserId(String userId) {
		boolean result = false;
		Optional<User> u = userRepo.findById(userId);
		if(u.isPresent())
			result = true;
		return result;
	}
	
	
	@Transactional
	public String changePasswordByUserId(String userId,String password) {
		String result = "";
		int row = userRepo.updatePassword(userId,password);
		if(row>0)
			result = "Password updated Successfully";
		return result;
	}
	
	@Transactional
	public String changePasswordByAccNo(String accNo,String password) {
		String result = "";
		Account acc = accRepo.findById(accNo).get();
		String userId = acc.getUserId();
		int row = userRepo.updatePassword(userId,password);
		if(row>0)
			result = "Password updated Successfully";
		return result;
	}

	public User fetchUser(String userId){
		return userRepo.fetchUser(userId);
	}
	
	public List<User> fetchAllUsers() {
		return userRepo.fetchAllUsers();
	}
	
	public int getTotalUsers() {
		return userRepo.getTotalUsers();
	}

}

