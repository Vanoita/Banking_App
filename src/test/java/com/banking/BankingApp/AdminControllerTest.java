package com.banking.BankingApp;



import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.web.servlet.handler.RequestMatchResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.banking.BankingApp.dao.UserRepository;
import com.banking.BankingApp.model.AdminUser;
import com.banking.BankingApp.model.User;
import com.banking.BankingApp.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
//@ExtendWith(SpringExtension.class)
//@ComponenetScan(basePackaages="com")

public class AdminControllerTest {
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private UserService service;
	
	@MockBean
	private UserRepository repo;
	
	private static ObjectMapper mapper = new ObjectMapper();
	
	@Test
	public void testAdminUser()throws Exception{
		AdminUser user = new AdminUser();
		user.setUserId("12345678");
		user.setFirstName("abhinav");
		user.setLastName("kumar");
		user.setPassword("12345");
		user.setEmail("okm@FGTR.COM");
		
		Mockito.when(service.registerAdminUser(ArgumentMatchers.any())).thenReturn(user);
		String json = mapper.writeValueAsString(user);
		//MvcResult res=((ResultActions)  ((MockHttpServletRequestBuilder).this.mvc.perform(post("/saveUser")))
		mvc.perform(post("/registerAdminUser").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		
	
	}
	
	@Test
	public void testLogin()throws Exception{
		AdminUser user = new AdminUser();
		user.setUserId("qwertyui");
		user.setPassword("12345");
		
		Mockito.when(service.registerAdminUser(ArgumentMatchers.any())).thenReturn(user);
		String json = mapper.writeValueAsString(user);
	
		mvc.perform(post("/checkLogin").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		
		
	}
	
	
	
	

}





