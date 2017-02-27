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

import com.simpleProject.model.Drink;
import com.simpleProject.model.DrinkCategory;
import com.simpleProject.model.Meal;
import com.simpleProject.model.MenuCategory;
import com.simpleProject.services.MealService;
import com.simpleProject.services.MenuCategoryService;

@RestController
public class MealController {

	@Autowired
	private MealService mealService;
	
	@Autowired
	private MenuCategoryService menuCategoryService;
	
	@RequestMapping(
            value    = "/api/menu/addMeal",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Meal> addMeal(@RequestBody Meal meal) {
		MenuCategory menuCategory = menuCategoryService.getById(meal.getIdMenuCategory());
		meal.setMc(menuCategory);
		Meal addingMeal= mealService.add(meal);
        return new ResponseEntity<Meal>(addingMeal, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/meal/updateMeal",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Meal> updateMeal(@RequestBody Meal meal) {
		MenuCategory mealCategory = menuCategoryService.getById(meal.getIdMenuCategory());
		meal.setMc(mealCategory);
		Meal addingMeal = mealService.update(meal);
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
