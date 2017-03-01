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
import com.simpleProject.model.Korisnik;
import com.simpleProject.model.Meal;
import com.simpleProject.model.MenuCategory;
import com.simpleProject.model.Restaurant;

@SuppressWarnings("deprecation")
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WebAppInitializer.class)
@WebIntegrationTest
@TestPropertySource(locations = "classpath:test.properties")
public class MenuCategoryServiceTest {

	@Autowired
	MenuCategoryService menuCategoryService;
	
	
	@Test
	public void getMenuCategoryById() {
		MenuCategory menuCategory = menuCategoryService.getById(1);
		
		assertThat(menuCategory).isNotNull();
		
		assertThat(menuCategory.getCategoryName()).isEqualTo("Jela sa rostilja");
		assertThat(menuCategory.getIdMenu()).isEqualTo(1);
		
	}
	
	@Test
	public void getAllMenuCategories() {
		Collection<MenuCategory> categories = menuCategoryService.getAll();
		assertThat(categories).isNotNull();
		assertThat(categories.size()).isEqualTo(2);
		
		List<MenuCategory> listOfCategories = (List<MenuCategory>) categories;
		MenuCategory category = listOfCategories.get(0);
		assertThat(category).isNotNull();
		
		List<Meal> meals = (List<Meal>) category.getMeals();
		
		assertThat(meals).isNotNull();
		
		assertThat(meals.get(0).getMealName()).isEqualTo("Cevapi");
		

	}
	
}
