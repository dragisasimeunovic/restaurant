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

import com.simpleProject.model.Menu;
import com.simpleProject.model.Restaurant;
import com.simpleProject.services.RestaurantService;

@RestController
public class RestaurantContoller {

	@Autowired
	private RestaurantService restaurantService;
	
	  @RequestMapping(
	            value    = "/api/restorani/restoran",
	            method   = RequestMethod.POST,
	            produces = MediaType.APPLICATION_JSON_VALUE
	    )
	    public ResponseEntity<Restaurant> registerRestaurant(@RequestBody Restaurant restaurant) {
	        Restaurant registrovanRestaurant = restaurantService.add(restaurant);
	        return new ResponseEntity<Restaurant>(registrovanRestaurant, HttpStatus.OK);
	    }
	  
	  @RequestMapping(
	            value    = "/api/restorani/sviRestorani",
	            method   = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE
	    )
	    public ResponseEntity<Collection<Restaurant>> allRestaurants() {
		  Collection<Restaurant> restaurants = restaurantService.getAll();
	        return new ResponseEntity<Collection<Restaurant>>(restaurants, HttpStatus.OK);
	    }
	  
	  @RequestMapping(
	    		value = "/api/restorani/{restaurantId}",
	    		method = RequestMethod.GET,
	    		produces = MediaType.APPLICATION_JSON_VALUE
	    )
	    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Integer restaurantId){
	    	Restaurant restaurantById = restaurantService.getRestaurantById(restaurantId);
	    	return new ResponseEntity<Restaurant>(restaurantById, HttpStatus.OK);
	    }
	  
}


