package com.simpleProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.DrinkOrderItem;
import com.simpleProject.repository.DrinkOrderItemRepository;

@Service
public class DrinkOrderItemService {
	
	@Autowired
	private DrinkOrderItemRepository drinkOrderItemRepository;
	
	
	public DrinkOrderItem add(DrinkOrderItem doi) {
		return drinkOrderItemRepository.save(doi);
	}

}
