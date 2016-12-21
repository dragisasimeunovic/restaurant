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

import com.simpleProject.model.DrinkCard;
import com.simpleProject.model.Menu;
import com.simpleProject.services.DrinkCardService;

@RestController
public class DrinkCardController {
	
	@Autowired
	DrinkCardService drinkCardService;
	
	@RequestMapping(
            value    = "/api/menu/addDrinkCard",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<DrinkCard> addMenu(@RequestBody DrinkCard drinkCard) {
        DrinkCard addingDrinkCard= drinkCardService.add(drinkCard);
        return new ResponseEntity<DrinkCard>(addingDrinkCard, HttpStatus.OK);
    }
	
	@RequestMapping(
    		value = "/api/drinkCard/{restaurantId}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<DrinkCard> getDrinkCardByRestaurantId(@PathVariable Integer restaurantId){
		DrinkCard drinkCardByRestaurant = drinkCardService.getDrinkCardByRestaurantId(restaurantId);
    	return new ResponseEntity<DrinkCard>(drinkCardByRestaurant, HttpStatus.OK);
    }

}
