package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.RestaurantMark;

public interface RestaurantMarkRepository extends JpaRepository<RestaurantMark, Integer>{

	
	public Collection<RestaurantMark> findByUserEmailAndRestaurantId(String userEmail, Integer restaurantId);
	
	
}
