package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.DrinkOrderList;
import com.simpleProject.repository.DrinkOrderListRepository;

@Service
public class DrinkOrderListService {

	@Autowired
	private DrinkOrderListRepository drinkOrderListRepository;

	public DrinkOrderList add(DrinkOrderList dol) {
		return drinkOrderListRepository.save(dol);
	}

	public DrinkOrderList getById(Integer id) {
		return drinkOrderListRepository.findOne(id);
	}
	
	public Collection<DrinkOrderList> getByRestaurantIdAndNonServed(Integer restaurantId, Boolean isServed) {
		return drinkOrderListRepository.findByRestaurantIdAndIsServed(restaurantId, isServed);
	}

	
	
	
}
