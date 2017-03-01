package com.simpleProject.controllers;

import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.assertNotNull;
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
import com.simpleProject.model.Reservation;
import com.simpleProject.model.Restaurant;
import com.simpleProject.model.Tablee;
import com.simpleProject.services.RestaurantService;


@SuppressWarnings("deprecation")
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WebAppInitializer.class)
@WebIntegrationTest
@TestPropertySource(locations = "classpath:test.properties")
public class RestaurantControllerTest {
	
	
	private static final String URL_PREFIX = "/api/restorani";

	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Autowired
	ObjectMapper mapper;
	
	@Autowired
	RestaurantService restaurantService;
	
	@PostConstruct
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
	}
	
	@Test
	@Transactional
	@Rollback(true)
	public void makeRestaurant() throws Exception {
		
		Restaurant r = new Restaurant();
		r.setId(3);
		r.setIme("Kineski");
		r.setTip("kineski");
		r.setLatitude(1.01231);
		r.setLongitude(90.23123);
		r.setOcena(5);
	
		String content = mapper.writeValueAsString(r);
		
		MvcResult result = mockMvc.perform(post(URL_PREFIX + "/restoran")
				.content(content) //JSON string reservation
				.contentType(contentType).accept(contentType))
				.andExpect(status().isOk())
				.andReturn();
		
		assertNotNull(result);
	}
	
	@Test
	public void testGetAllRestaurants() throws Exception {
		this.mockMvc.perform(get(URL_PREFIX + "/sviRestorani"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(contentType))
				.andExpect(jsonPath("$", hasSize(2)))
				.andExpect(jsonPath("$.[*].ime").value(hasItem("Domana")))
				.andExpect(jsonPath("$.[*].ocena").value(hasItem(5)))
				.andExpect(jsonPath("$.[*].tip").value(hasItem("ugljevicki specijaliteti")));
	}
	
	
	@Test
	public void testGetRestaurantById() throws Exception {
		
		MvcResult result = mockMvc.perform(get(URL_PREFIX + "/" + "2")
				.contentType(contentType).accept(contentType))
				.andExpect(status().isOk())
				.andReturn();
		
		assertNotNull(result);
	}
	
	
	

}
