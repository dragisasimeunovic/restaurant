package com.simpleProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.Groceries;
import com.simpleProject.repository.GroceriesRepository;

@Service
public class GroceriesService {
	
	@Autowired
	GroceriesRepository groceriesRepository;

	public Groceries add(Groceries groceries) {
		return groceriesRepository.save(groceries);
	}

}
