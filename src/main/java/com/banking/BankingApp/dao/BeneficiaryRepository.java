package com.banking.BankingApp.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.banking.BankingApp.model.Beneficiary;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary,String>{

	@Query("select b from Beneficiary b where b.userId=?1")
	public List<Beneficiary> findAllBeneficiary(String userID);
}
