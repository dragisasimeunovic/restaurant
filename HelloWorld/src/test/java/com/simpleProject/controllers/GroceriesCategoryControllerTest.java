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
import com.simpleProject.model.GroceriesCategory;
import com.simpleProject.model.Reservation;
import com.simpleProject.model.Restaurant;
import com.simpleProject.model.Tablee;
import com.simpleProject.services.GroceriesCategoryService;
import com.simpleProject.services.RestaurantService;


@SuppressWarnings("deprecation")
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WebAppInitializer.class)
@WebIntegrationTest
@TestPropertySource(locations = "classpath:test.properties")
public class GroceriesCategoryControllerTest {

	private static final String URL_PREFIX = "/api/groceriesCategory";

	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Autowired
	ObjectMapper mapper;
	
	@PostConstruct
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
	}
	
	@Autowired
	GroceriesCategoryService groceriesCategoryService;
	
	@Test
	@Transactional
	@Rollback(true)
	public void makeGroceriesCategory() throws Exception {
		
		GroceriesCategory groceriesCategory = new GroceriesCategory();
		groceriesCategory.setId(3);
		groceriesCategory.setCategoryName("Zacini");
		
		String content = mapper.writeValueAsString(groceriesCategory);
		
		MvcResult result = mockMvc.perform(post(URL_PREFIX + "/addGroceriesCategory")
				.content(content) //JSON string reservation
				.contentType(contentType).accept(contentType))
				.andExpect(status().isOk())
				.andReturn();
		
		assertNotNull(result);	
	
	}
	
	
	@Test
	public void testGetAllGroceriesCategories() throws Exception {
		this.mockMvc.perform(get(URL_PREFIX + "/allCategories"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(contentType))
				.andExpect(jsonPath("$", hasSize(1)))
				.andExpect(jsonPath("$.[*].categoryName").value(hasItem("Voce")));
	}
	
	
	
}
