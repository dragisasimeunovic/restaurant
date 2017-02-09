package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.DrinkCategory;
import com.simpleProject.model.Menu;
import com.simpleProject.model.Restaurant;
import com.simpleProject.repository.RestaurantRepository;

@Service
public class RestaurantService {
	
	@Autowired
    RestaurantRepository restaurantRepository;
	
	public Collection<Restaurant> getAll(){
		return restaurantRepository.findAll();
	}

	
	public Restaurant add(Restaurant restaurant){
		return restaurantRepository.save(restaurant);
	}
	
	public Restaurant getRestaurantById(Integer restaurantId){
		return restaurantRepository.findOne(restaurantId);
	}
	
	
	
}
