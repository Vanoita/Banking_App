package com.banking.BankingApp.dao;

<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


=======
import java.util.List;

>>>>>>> 950ff7f0e4060c48641dda9ec99bcf21d04a4188
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.banking.BankingApp.model.Account;
import com.banking.BankingApp.model.User;

public interface UserRepository extends JpaRepository<User,String> {
<<<<<<< HEAD

	
	@Modifying
	@Query("update User user set user.password=?2 where user.userId=?1")
	public int updatePassword(String userId,String password);

	@Query("SELECT u from User u where u.userId=?1")
	public User fetchUser(String userId);

=======
	@Query("SELECT u from User u where u.userId=?1")
	public User fetchUser(String userId);
>>>>>>> 950ff7f0e4060c48641dda9ec99bcf21d04a4188
}
