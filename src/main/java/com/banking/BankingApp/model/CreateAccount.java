package com.banking.BankingApp.model;

import java.util.Date;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;


@Entity
public class CreateAccount {

	@Id
	@NotBlank(message="Please enter your Username.")
	@Length(min=12,max=12,message="Username should be 8 characters long.")
	private String accNo;
	
	@NotBlank(message="Please enter your Firstname.")
	@Length(min=2,max=20)
	private String firstName;
	
	@Length(min=2,max=20)
	private String middleName;
	
	@NotBlank(message="Please enter your Lastname.")
	@Length(min=2,max=20)
	private String lastName;
	
	@NotBlank(message="Please enter your Mobile number.")
	@Length(min=10,max=10)
	private String mobNo;
	
	@NotBlank(message="Please enter your Father name.")
	@Length(min=2,max=20)
	private String fatherName;
	
	@Email
	private String email;
	
	@NotBlank(message="Please enter your Occupation type.")
	@Length(min=1,max=30)
	private String occType;
	
	@NotBlank(message="Please enter your Source of income.")
	@Length(min=2,max=20)
	private String sourceOfIncome;
	
	@NotBlank(message="Please enter your date of birth.")	
	private Date dob;
	
	@NotBlank(message="Please enter your Account Number.")
	@Length(min=8,max=8)
	private String userId;
	
	
	private double balance;
	
	@NotBlank(message="Please enter your Aadhar details.")
	@Length(min=12,max=12)
	private String aadhar;
	
	@NotNull(message="Please enter your Annual gross income.")
	private double annualGrossIncome;
	
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public String getAccNo() {
		return accNo;
	}
	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}
	public String getAadhar() {
		return aadhar;
	}
	public void setAadhar(String aadhar) {
		this.aadhar = aadhar;
	}
	
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userID) {
		this.userId = userID;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
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
	public double getAnnualGrossIncome() {
		return annualGrossIncome;
	}
	public void setAnnualGrossIncome(double annualGrossIncome) {
		this.annualGrossIncome = annualGrossIncome;
	}
	
//	@OneToMany(cascade=CascadeType.ALL)
//	@JoinColumn(name="accNo")
//	private List<Address> userAddress;
	
	
	
	
	
}
