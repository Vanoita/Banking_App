package com.banking.BankingApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.BankingApp.model.Beneficiary;
import com.banking.BankingApp.service.BeneficiaryService;

@RestController
@CrossOrigin("http://localhost:3000")
public class BeneficiaryController {
	@Autowired
	BeneficiaryService benService;
	
	@PostMapping("/addBeneficiary")
	public Beneficiary addBeneficiary(@RequestBody Beneficiary b) {
		return benService.addBeneficiary(b);
	}
	
	@PostMapping("/getBeneficiary/{userId}")
	public List<Beneficiary> getBeneficiary(@PathVariable("userId") String userId) {
		return benService.getBeneficiary(userId);
	}

}
