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
import com.simpleProject.model.Restaurant;
import com.simpleProject.model.Tablee;
import com.simpleProject.services.DrinkCategoryService;
import com.simpleProject.services.RestaurantService;
import com.simpleProject.services.TableeService;

@RestController
public class TableeController {

	@Autowired
	private TableeService tableeService;
	
	@Autowired
	private RestaurantService restaurantService;
	
	@RequestMapping(
            value    = "/api/restaurant/addTable",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Tablee> addDrink(@RequestBody Tablee tablee) {
		Restaurant restaurant = restaurantService.getRestaurantById(tablee.getIdRestaurant());
		tablee.setRestaurant(restaurant);
		Tablee addingTablee = tableeService.add(tablee);
        return new ResponseEntity<Tablee>(addingTablee, HttpStatus.OK);
    }
	
	
}
