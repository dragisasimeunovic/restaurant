package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.DrinkOrderItem;
import com.simpleProject.repository.DrinkOrderRepository;

@Service
public class DrinkOrderService {

	@Autowired
	DrinkOrderRepository drinkOrderRepository;
	
	public Collection<DrinkOrderItem> getAll(){
		return drinkOrderRepository.findAll();
	}

	
	public DrinkOrderItem addDrinkOrder(DrinkOrderItem drinkOrder){
		return drinkOrderRepository.save(drinkOrder);
	}
	
	
}
