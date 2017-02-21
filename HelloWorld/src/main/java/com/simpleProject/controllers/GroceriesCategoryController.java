package com.simpleProject.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.model.Groceries;
import com.simpleProject.model.GroceriesCategory;
import com.simpleProject.model.Korisnik;
import com.simpleProject.services.GroceriesCategoryService;

@RestController
public class GroceriesCategoryController {

	@Autowired
	GroceriesCategoryService groceriesCategoryService;
	
	@RequestMapping(
            value    = "/api/groceriesCategory/addGroceriesCategory",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<GroceriesCategory> addGroceriesCategory(@RequestBody GroceriesCategory groceriesCategory) {
		GroceriesCategory addingGroceriesCategory = groceriesCategoryService.add(groceriesCategory);
        return new ResponseEntity<GroceriesCategory>(addingGroceriesCategory, HttpStatus.OK);
    }

	@RequestMapping(
			value = "/api/groceriesCategory/allCategories",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE
			)
	public ResponseEntity<Collection<GroceriesCategory>> allCategories(){
		Collection<GroceriesCategory> allCategories = groceriesCategoryService.allCategories();
		return new ResponseEntity<Collection<GroceriesCategory>>(allCategories, HttpStatus.OK);
	}
	
}
