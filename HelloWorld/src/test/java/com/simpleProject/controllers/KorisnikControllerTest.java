package com.simpleProject.controllers;

import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.charset.Charset;

import javax.annotation.PostConstruct;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.simpleProject.WebAppInitializer;
import com.simpleProject.model.Korisnik;
import com.simpleProject.services.KorisnikService;

@SuppressWarnings("deprecation")
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WebAppInitializer.class)
@WebIntegrationTest
@TestPropertySource(locations = "classpath:test.properties")
@Transactional
public class KorisnikControllerTest {
	
	private static final String URL_PREFIX = "/api/korisnici";

	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Autowired
	ObjectMapper mapper;
	
	@Autowired
	KorisnikService korisnikService;
	
	@PostConstruct
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
	}
	
	@Test
	public void testGetAllUsers() throws Exception {
		this.mockMvc.perform(get(URL_PREFIX + "/sviKorisnici"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(contentType))
				.andExpect(jsonPath("$", hasSize(2)))
				.andExpect(jsonPath("$.[*].email").value(hasItem("e1@gmail.com")))
				.andExpect(jsonPath("$.[*].lozinka").value(hasItem("123")))
				.andExpect(jsonPath("$.[*].ime").value(hasItem("Milica")))
				.andExpect(jsonPath("$.[*].prezime").value(hasItem("Bucko")));
	}
	
	@Test
	@Transactional
	@Rollback(true)
	public void registerUser() throws Exception {
		Korisnik user = new Korisnik();
		user.setEmail("e3@gmail.com");
		user.setLozinka("123456");
		user.setIme("Kaca");
		user.setPrezime("Kaca");

		String content = mapper.writeValueAsString(user);
		
		MvcResult result = mockMvc.perform(post(URL_PREFIX + "/korisnik")
				.content(content) //JSON string user
				.contentType(contentType).accept(contentType))
				.andExpect(jsonPath("$.email").value("e3@gmail.com"))
				.andExpect(jsonPath("$.ime").value("Kaca"))
				.andExpect(jsonPath("$.prezime").value("Kaca"))
				.andExpect(jsonPath("$.lozinka").value("123456"))
				.andExpect(status().isOk())
				.andReturn();
		assertNotNull(result);
	}
	



}
