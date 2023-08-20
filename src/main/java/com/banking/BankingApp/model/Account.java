package com.banking.BankingApp.model;

import java.util.Date;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;



@Entity
public class Account {

	@Id
	@NotBlank(message="Please enter your Account Number.")
	@Length(min=12,max=12,message="Account Number should be 12 characters long.")
	private String accNo;
	
	@NotBlank(message="Please enter your Mobile number.")
	@Length(min=10,max=10)
	private String mobNo;
	
	@NotBlank(message="Please enter your Father name.")
	@Length(min=2,max=20)
	private String fatherName;
	
	@NotBlank(message="Please enter your Occupation type.")
	@Length(min=1,max=30)
	private String occType;
	
	@NotBlank(message="Please enter your Source of income.")
	@Length(min=2,max=20)
	private String sourceOfIncome;
	
	//@NotBlank(message="Please enter your date of birth.")	
	private Date dob;
	
	//@NotBlank(message="Please enter your Account Number.")
	@Length(min=8,max=8)
	private String userId;
	
	
	private double balance;
	
	@NotBlank(message="Please enter your Aadhar details.")
	@Length(min=12,max=12)
	private String aadhar;
	
	@NotNull(message="Please enter your Annual gross income.")
	private double annualGrossIncome;
	
	private String address;
	private String city;
	private String state;
	private String pincode;
	
	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}


	public String getAccNo() {
		return accNo;
	}

	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}

	public String getMobNo() {
		return mobNo;
	}

	public void setMobNo(String mobNo) {
		this.mobNo = mobNo;
	}

	public String getFatherName() {
		return fatherName;
	}

	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}

	public String getOccType() {
		return occType;
	}

	public void setOccType(String occType) {
		this.occType = occType;
	}

	public String getSourceOfIncome() {
		return sourceOfIncome;
	}

	public void setSourceOfIncome(String sourceOfIncome) {
		this.sourceOfIncome = sourceOfIncome;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public String getAadhar() {
		return aadhar;
	}

	public void setAadhar(String aadhar) {
		this.aadhar = aadhar;
	}

	public double getAnnualGrossIncome() {
		return annualGrossIncome;
	}

	public void setAnnualGrossIncome(double annualGrossIncome) {
		this.annualGrossIncome = annualGrossIncome;
	}
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="accNo")
	private List<Transaction> transactionList;
	
}
