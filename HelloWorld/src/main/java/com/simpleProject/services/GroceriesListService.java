package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.GroceriesList;
import com.simpleProject.repository.GroceriesListRepository;

@Service
public class GroceriesListService {

	@Autowired
	private GroceriesListRepository groceriesListRepository;

	public GroceriesList add(GroceriesList groceriesList) {
		
		return groceriesListRepository.save(groceriesList);
	}

	public Collection<GroceriesList> getAllLists(Integer restaurantId, String startingTime, String endingTime) {
		return groceriesListRepository.findByRestaurantIdAndStartingTimeGreaterThanAndEndingTimeLessThan(restaurantId, startingTime, endingTime);
	}

	public GroceriesList getById(Integer id) {
		return groceriesListRepository.findOne(id);
	}

	public Collection<GroceriesList> getAllOngoingLists(String startingTime) {
		return groceriesListRepository.findByEndingTimeGreaterThan(startingTime);
	}

	public Integer setActiveToFalse(boolean b, Integer id) {
		return groceriesListRepository.setActiveForGroceriesList(b, id);
	}
	
}
