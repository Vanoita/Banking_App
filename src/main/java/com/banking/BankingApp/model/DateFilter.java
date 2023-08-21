package com.banking.BankingApp.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class DateFilter {
	@JsonFormat(pattern="yyyy-MM-dd")
	Date startDate;
	@JsonFormat(pattern="yyyy-MM-dd")
	Date endDate;
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}	
	
}
