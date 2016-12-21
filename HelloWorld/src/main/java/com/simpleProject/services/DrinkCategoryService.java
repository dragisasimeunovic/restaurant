package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.DrinkCategory;
import com.simpleProject.model.MenuCategory;
import com.simpleProject.repository.DrinkCategoryRepository;

@Service
public class DrinkCategoryService {
	
	@Autowired
	DrinkCategoryRepository drinkCategoryRepository;
	
	public Collection<DrinkCategory> getAll(){
		return drinkCategoryRepository.findAll();
	}

	
	public DrinkCategory add(DrinkCategory drinkCategory){
		return drinkCategoryRepository.save(drinkCategory);
	}
	
	
	
	public Collection<DrinkCategory> findByIdDrinkCard(Integer drinkCardId) {
		return drinkCategoryRepository.findByIdDrinkCard(drinkCardId);
	}

}
