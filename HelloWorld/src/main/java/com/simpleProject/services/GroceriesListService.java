package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.GroceriesList;
import com.simpleProject.repository.GroceriesListRepository;

@Service
public class GroceriesListService {

	@Autowired
	GroceriesListRepository groceriesListRepository;

	public GroceriesList add(GroceriesList groceriesList) {
		
		return groceriesListRepository.save(groceriesList);
	}

	public Collection<GroceriesList> getAllLists(Integer restaurantId, String startingTime, String endingTime) {
		return groceriesListRepository.findByRestaurantIdAndStartingTimeAndEndingTime(restaurantId, startingTime, endingTime);
	}

	public GroceriesList getById(Integer id) {
		return groceriesListRepository.findOne(id);
	}
	
}
