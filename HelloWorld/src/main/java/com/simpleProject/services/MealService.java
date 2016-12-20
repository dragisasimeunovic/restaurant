package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.Meal;
import com.simpleProject.repository.MealRepository;

@Service
public class MealService {

	@Autowired
	MealRepository mealRepository;
	
	public Collection<Meal> getAll(){
		return mealRepository.findAll();
	}

	
	public Meal add(Meal meal){
		return mealRepository.save(meal);
	}
	
	public Collection<Meal> findAllCategoryMeals(Integer menuCategoryId) {
		return mealRepository.findByIdMenuCategory(menuCategoryId);
	}
	
	
}
