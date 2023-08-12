package com.banking.BankingApp.model;

public class LoginModel {
	private String userId;
	private String password;
	public String getUsername() {
		return userId;
	}
	public void setUsername(String username) {
		this.userId = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
