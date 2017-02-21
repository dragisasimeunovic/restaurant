package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.GroceriesCategory;
import com.simpleProject.repository.GroceriesCategoryRepository;

@Service
public class GroceriesCategoryService {
	
	@Autowired
	private GroceriesCategoryRepository groceriesCategoryRepository;

	public GroceriesCategory add(GroceriesCategory groceriesCategory) {
		
		return groceriesCategoryRepository.save(groceriesCategory);
	}

	public Collection<GroceriesCategory> allCategories() {
		return groceriesCategoryRepository.findAll();
	}
	
	public GroceriesCategory getById(Integer id) {
		return groceriesCategoryRepository.findOne(id);
	}

}
