package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.RestaurantMark;
import com.simpleProject.repository.RestaurantMarkRepository;

@Service
public class RestaurantMarkService {

	
	@Autowired
	private RestaurantMarkRepository restaurantMarkRepository;

	public RestaurantMark add(RestaurantMark vm) {
		return restaurantMarkRepository.save(vm);
	}
	
	public Collection<RestaurantMark> ratedUserRestaurant(String email, Integer id) {
		return restaurantMarkRepository.findByUserEmailAndRestaurantId(email, id);
	}
	
	
}
