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

import com.simpleProject.model.Meal;
import com.simpleProject.model.MenuCategory;
import com.simpleProject.services.MealService;

@RestController
public class MealController {

	@Autowired
	private MealService mealService;
	
	@RequestMapping(
            value    = "/api/menu/addMeal",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Meal> addMeal(@RequestBody Meal meal) {
		Meal addingMeal= mealService.add(meal);
        return new ResponseEntity<Meal>(addingMeal, HttpStatus.OK);
    }
	
	
	@RequestMapping(
    		value = "/api/menu/meals/allCategoryMeals/{menuCategoryId}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Meal>> allCategoryMeals(@PathVariable Integer menuCategoryId){
    	Collection<Meal> allMeals = mealService.findAllCategoryMeals(menuCategoryId);
    	return new ResponseEntity<Collection<Meal>>(allMeals, HttpStatus.OK);
    }
	
	
}
