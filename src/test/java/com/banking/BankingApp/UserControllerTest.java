package com.banking.BankingApp;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.PostMapping;

import com.banking.BankingApp.dao.UserRepository;
import com.banking.BankingApp.model.User;
import com.banking.BankingApp.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;


@SpringBootTest
 @AutoConfigureMockMvc
public class UserControllerTest {
	@Autowired
	private MockMvc mvc;	
	@MockBean
	private UserService service;	
	@MockBean
	private UserRepository repo;
	
	private static ObjectMapper mapper = new ObjectMapper();
	
	@Test
	public void testSaveUser() throws Exception{
		User user = new User();
		user.setUserId("12345678");
		user.setFirstName("asdf");
		user.setLastName("erf");
		user.setEmail("ayush@gmail.com");
		user.setPassword("12345=");
		
		Mockito.when(service.registerUser(ArgumentMatchers.any())).thenReturn(user);
		String json = mapper.writeValueAsString(user);
		
		mvc.perform(post("/registerUser").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		
		
	}
	
	@Test
	public void testLogin() throws Exception{
		User user = new User();
		user.setUserId("12345678");
		user.setPassword("12345=");
		
		Mockito.when(service.registerUser(ArgumentMatchers.any())).thenReturn(user);
		String json = mapper.writeValueAsString(user);
		
		mvc.perform(post("/checkLogin").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		
	}
	
	@Test
	public void testFetchAllUsers() throws Exception {
		User user = new User();
		
		user.setFirstName("wood");
		user.setUserId("19215367");
		user.setEmail("woody@gmail.com");
		user.setLastName("Mark");
		user.setPassword("wEr@345");
		
		List<User> userList = new ArrayList<>();
		userList.add(user);
		
		Mockito.when(service.fetchAllUsers()).thenReturn(userList);
		String json = mapper.writeValueAsString(user);
		
		mvc.perform(get("/fetchAllUsers").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
		        .andExpect(jsonPath("$",Matchers.hasSize(1)))
		        .andExpect(jsonPath("$[0].userId",Matchers.equalTo(user.getUserId())))
		        .andExpect(jsonPath("$[0].password",Matchers.equalTo(user.getPassword())))
		        .andExpect(jsonPath("$[0].email",Matchers.equalTo(user.getEmail())))
		        .andExpect(jsonPath("$[0].firstName",Matchers.equalTo(user.getFirstName())))
		        .andExpect(jsonPath("$[0].lastName",Matchers.equalTo(user.getLastName())));
		
	  

	}

}
