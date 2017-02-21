package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.GroceriesList;

public interface GroceriesListRepository extends JpaRepository<GroceriesList, Integer>{

	public Collection<GroceriesList> findByRestaurantIdAndStartingTimeAndEndingTime(Integer restaurantId, String startingTime, String endingTime);
	
}
