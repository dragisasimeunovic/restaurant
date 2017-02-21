package com.simpleProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.GroceriesListItem;
import com.simpleProject.repository.GroceriesListItemRepository;

@Service
public class GroceriesListItemService {

	@Autowired
	GroceriesListItemRepository groceriesListItemRepository;

	public GroceriesListItem add(GroceriesListItem groceriesLI) {
		return groceriesListItemRepository.save(groceriesLI);
	}
	
}
