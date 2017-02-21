package com.simpleProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.model.Groceries;
import com.simpleProject.model.GroceriesCategory;
import com.simpleProject.services.GroceriesCategoryService;
import com.simpleProject.services.GroceriesService;

@RestController
public class GroceriesController {

	@Autowired
	private GroceriesService groceriesService;
	
	@Autowired
	private GroceriesCategoryService groceriesCategoryService;
	
	
	@RequestMapping(
            value    = "/api/groceries/addGroceries/{id}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Groceries> addGroceries(@RequestBody Groceries groceries, @PathVariable Integer id) {
		GroceriesCategory groceriesCategory = groceriesCategoryService.getById(id);
		groceries.setgCategory(groceriesCategory);
		Groceries addingGroceries = groceriesService.add(groceries);
        return new ResponseEntity<Groceries>(addingGroceries, HttpStatus.OK);
    }
}
