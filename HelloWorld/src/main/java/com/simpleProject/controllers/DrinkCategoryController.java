package com.simpleProject.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.model.DrinkCategory;
import com.simpleProject.model.MenuCategory;
import com.simpleProject.services.DrinkCategoryService;

@RestController
public class DrinkCategoryController {
	
	@Autowired
	DrinkCategoryService drinkCategoryService;
	
	
	
	@RequestMapping(
            value    = "/api/drinkCard/addDrinkCategory",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<DrinkCategory> addDrinkCategory(@RequestBody DrinkCategory drinkCategory) {
		DrinkCategory addingDrinkCategory= drinkCategoryService.add(drinkCategory);
        return new ResponseEntity<DrinkCategory>(addingDrinkCategory, HttpStatus.OK);
    }
	
	@RequestMapping(
    		value = "/api/category/allCategoriesInDrinkCard/{drinkCardId}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<DrinkCategory>> allCategoriesInDrinkCard(@PathVariable Integer drinkCardId){
    	Collection<DrinkCategory> allCategories = drinkCategoryService.findByIdDrinkCard(drinkCardId);
    	return new ResponseEntity<Collection<DrinkCategory>>(allCategories, HttpStatus.OK);
    }

}
