package com.banking.BankingApp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.BankingApp.dao.BeneficiaryRepository;
import com.banking.BankingApp.model.Beneficiary;

@Service
public class BeneficiaryService {
	@Autowired
	BeneficiaryRepository benRepo;	
	
	public Beneficiary addBeneficiary(Beneficiary b) {
		return benRepo.save(b);
	}
	
	public List<Beneficiary> getBeneficiary(String userId) {
		List<Beneficiary> b = benRepo.findAllBeneficiary(userId);
		return b;
	}
}
