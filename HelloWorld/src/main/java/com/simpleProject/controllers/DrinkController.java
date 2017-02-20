package com.simpleProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.model.Drink;
import com.simpleProject.model.DrinkCategory;
import com.simpleProject.services.DrinkCategoryService;
import com.simpleProject.services.DrinkService;

@RestController
public class DrinkController {
	
	@Autowired
	private DrinkService drinkService;
	
	@Autowired
	private DrinkCategoryService drinkCategoryService;
	
	@RequestMapping(
            value    = "/api/drinkCard/addDrink",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Drink> addDrink(@RequestBody Drink drink) {
		DrinkCategory drinkCategory = drinkCategoryService.findOne(drink.getIdDrinkCategory());
		drink.setdCategory(drinkCategory);
		Drink addingDrink = drinkService.add(drink);
        return new ResponseEntity<Drink>(addingDrink, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/drinkCard/updateDrink",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Drink> updateDrink(@RequestBody Drink drink) {
		DrinkCategory drinkCategory = drinkCategoryService.findOne(drink.getIdDrinkCategory());
		drink.setdCategory(drinkCategory);
		Drink addingDrink = drinkService.update(drink);
        return new ResponseEntity<Drink>(addingDrink, HttpStatus.OK);
    }
	
	

}
