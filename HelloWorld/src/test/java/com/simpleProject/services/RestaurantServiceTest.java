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
import com.simpleProject.model.Restaurant;

@SuppressWarnings("deprecation")
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WebAppInitializer.class)
@WebIntegrationTest
@TestPropertySource(locations = "classpath:test.properties")
public class RestaurantServiceTest {
	
	@Autowired
	RestaurantService restaurantService;
	
	
	@Test
	@Transactional
	@Rollback(true)
	public void save() {
		Restaurant restaurant = new Restaurant();
		
		restaurant.setId(3);
		restaurant.setIme("Fontana");
		restaurant.setOcena(5);
		restaurant.setTip("italijanksi");
		restaurant.setLatitude(1.04213);
		restaurant.setLongitude(100.3213);
		
		int sizeBeforeAdding = restaurantService.getAll().size();
		
		Restaurant addedRestaurant = restaurantService.add(restaurant);
		assertThat(addedRestaurant).isNotNull();
		
		
		List<Restaurant> restaurants = (List<Restaurant>) restaurantService.getAll();
		
		assertThat(restaurants).hasSize(sizeBeforeAdding + 1);
		addedRestaurant = restaurants.get(restaurants.size() - 1);
		
		
		assertThat(addedRestaurant.getIme()).isEqualTo("Fontana");
		assertThat(addedRestaurant.getTip()).isEqualTo("italijanksi");
		
	}
	
	
	@Test
	public void getRestaurantById(){
		Restaurant restaurant = restaurantService.getRestaurantById(1);
		assertThat(restaurant).isNotNull();
		
		assertThat(restaurant.getIme()).isEqualTo("Plava frajla");
		assertThat(restaurant.getOcena()).isEqualTo(5);
		assertThat(restaurant.getLatitude()).isEqualTo(1);
		
	} 
	

}
