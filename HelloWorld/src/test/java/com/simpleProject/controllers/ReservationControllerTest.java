package com.simpleProject.controllers;

import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
import com.simpleProject.model.Reservation;
import com.simpleProject.model.Tablee;
import com.simpleProject.services.KorisnikService;
import com.simpleProject.services.TableeService;

@SuppressWarnings("deprecation")
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WebAppInitializer.class)
@WebIntegrationTest
@TestPropertySource(locations = "classpath:test.properties")
public class ReservationControllerTest {
	
	private static final String URL_PREFIX = "/api/reservation";

	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Autowired
	ObjectMapper mapper;
	
	@Autowired
	KorisnikService korisnikService;
	
	@Autowired
	TableeService tableService;
	
	@PostConstruct
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
	}
	
	@Test
	@Transactional
	@Rollback(true)
	public void makeReservation() throws Exception {
		
		Reservation r = new Reservation();
		r.setId(1);
		r.setRestaurantId(1);
		r.setGuestId("e1@gmail.com");
		r.setComingTime("12:00");
		r.setLeavingTime("14:00");
		
		Tablee table = tableService.getTableeById(1);
		r.setReservedTable(table);

		String content = mapper.writeValueAsString(r);
		
		MvcResult result = mockMvc.perform(post(URL_PREFIX + "/addReservation")
				.content(content) //JSON string reservation
				.contentType(contentType).accept(contentType))
				.andExpect(status().isOk())
				.andReturn();
		
		assertNotNull(result);
	}
	
	@Test
	@Transactional
	@Rollback(true)
	public void cancelReservation() throws Exception {
		
		MvcResult result = mockMvc.perform(post(URL_PREFIX + "/cancelReservation/" + "1")
				.contentType(contentType).accept(contentType))
				.andExpect(status().isOk())
				.andReturn();
		
		assertNotNull(result);
	}

}
