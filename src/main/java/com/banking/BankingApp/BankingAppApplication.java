package com.banking.BankingApp;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@ComponentScan({"com"})
@EnableJpaRepositories(basePackages = "com.banking.BankingApp.dao")
@EntityScan({"com.banking.BankingApp.model"})

//@SpringBootApplication(exclude =  {DataSourceAutoConfiguration.class })
@SpringBootApplication
public class BankingAppApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(BankingAppApplication.class, args);
	}

}
