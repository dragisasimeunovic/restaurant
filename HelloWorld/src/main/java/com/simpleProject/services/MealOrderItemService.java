package com.simpleProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.DrinkOrderItem;
import com.simpleProject.model.MealOrderItem;
import com.simpleProject.repository.DrinkOrderItemRepository;
import com.simpleProject.repository.MealOrderItemRepository;

@Service
public class MealOrderItemService {

	@Autowired
	private MealOrderItemRepository mealOrderItemRepository;
	
	
	public MealOrderItem add(MealOrderItem doi) {
		return mealOrderItemRepository.save(doi);
	}
	
	public Integer setPreparedForMealOrderItem(Boolean prepared, Integer id){
		return mealOrderItemRepository.setIsPreparedForMealOrderItem(prepared, id);
	}

	public Integer setPreparingForMealOrderItem(Boolean preparing, Integer id) {
		return mealOrderItemRepository.setIsPreparingForMealOrderItem(preparing, id);
	}
	
}
