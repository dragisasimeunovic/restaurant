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

import com.simpleProject.model.Restaurant;
import com.simpleProject.model.Tablee;
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
	
	@RequestMapping(
    		value = "/api/restaurant/getAllRestaurantTables/{restaurantId}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Tablee>> getRestaurantById(@PathVariable Integer restaurantId){
    	Collection<Tablee> restaurantTables = tableeService.getAllRestaurantTables(restaurantId);
    	return new ResponseEntity<Collection<Tablee>>(restaurantTables, HttpStatus.OK);
    }
	
	@RequestMapping(
    		value = "/api/restaurant/getRestaurantTable/{restaurantId}/{tableNumber}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Tablee> getTableByIdRestaurantAndNumber(@PathVariable Integer restaurantId, @PathVariable String tableNumber){
    	Tablee restaurantTable = tableeService.getTableByIdRestaurantAndNumber(restaurantId, tableNumber);
    	return new ResponseEntity<Tablee>(restaurantTable, HttpStatus.OK);
    }
	
	
}
