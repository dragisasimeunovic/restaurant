package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.DrinkOrder;
import com.simpleProject.repository.DrinkOrderRepository;

@Service
public class DrinkOrderService {

	@Autowired
	DrinkOrderRepository drinkOrderRepository;
	
	public Collection<DrinkOrder> getAll(){
		return drinkOrderRepository.findAll();
	}

	
	public DrinkOrder addDrinkOrder(DrinkOrder drinkOrder){
		return drinkOrderRepository.save(drinkOrder);
	}
	
	
}
