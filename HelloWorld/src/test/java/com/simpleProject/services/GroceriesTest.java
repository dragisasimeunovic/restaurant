package com.simpleProject.services;

import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;

import com.simpleProject.WebAppInitializer;
import com.simpleProject.model.Groceries;
import com.simpleProject.model.GroceriesCategory;
import com.simpleProject.model.GroceriesList;
import com.simpleProject.model.Korisnik;

@SuppressWarnings("deprecation")
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WebAppInitializer.class)
@WebIntegrationTest
@TestPropertySource(locations = "classpath:test.properties")
public class GroceriesTest {
	
	
	@Autowired
	GroceriesCategoryService groceriesCategoryService;
	
	@Autowired
	GroceriesService groceriesService;
	
	@Autowired 
	GroceriesListService groceriesListService;
	
	@Autowired
	GroceriesListItemService groceriesListItemService;
	
	
	@Test
	@Transactional
	@Rollback(true)
	public void groceriesTests() {
		
		GroceriesCategory groceriesCategory = new GroceriesCategory();
		groceriesCategory.setId(2);
		groceriesCategory.setCategoryName("Povrce");
		GroceriesCategory addedCategory = groceriesCategoryService.add(groceriesCategory);
		
		assertThat(addedCategory).isNotNull();
		
		Groceries groceries = new Groceries();
		groceries.setId(3);
		groceries.setGroceriesName("Krastavac");
		groceries.setgCategory(addedCategory);
		
		Groceries addedGroceries = groceriesService.add(groceries);
		
		assertThat(addedGroceries).isNotNull();
		assertThat(addedCategory.getCategoryName()).isEqualTo("Povrce");
		
		
		GroceriesList groceriesList = new GroceriesList();
		groceriesList.setId(2);
		groceriesList.setListName("PovrceZaNarucivanje");
		groceriesList.setEndingTime("15:00");
		groceriesList.setStartingTime("08:00");
		groceriesList.setRestaurantId(1);
		groceriesList.setActive(true);
		
		GroceriesList addedGL = groceriesListService.add(groceriesList);
		assertThat(addedGL).isNotNull();
		assertThat(addedGL.getListName()).isEqualTo("PovrceZaNarucivanje");
		
	}
	

}
