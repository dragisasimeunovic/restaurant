package com.simpleProject.controllers;

import java.util.Collection;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.model.GroceriesList;
import com.simpleProject.services.GroceriesListService;

@RestController
public class GroceriesListController {

	@Autowired
	private GroceriesListService groceriesListService;
	
	@RequestMapping(
            value    = "/api/groceries/addList",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<GroceriesList> addGroceriesList(@RequestBody GroceriesList gl) {
		GroceriesList addingGroceriesList = groceriesListService.add(gl);
        return new ResponseEntity<GroceriesList>(addingGroceriesList, HttpStatus.OK);
    }
	
	
	@RequestMapping(
            value    = "/api/groceries/getLists/{restaurantId}/{startingTime}/{endingTime}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<GroceriesList>> getGroceriesLists(@PathVariable Integer restaurantId, @PathVariable String startingTime, @PathVariable String endingTime) {
		Collection<GroceriesList> groceriesLists = groceriesListService.getAllLists(restaurantId, startingTime, endingTime);
        return new ResponseEntity<Collection<GroceriesList>>(groceriesLists, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/groceries/getListsByStartingTime/{startingTime}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<GroceriesList>> getListsByStartingTime(@PathVariable String startingTime) {
		Collection<GroceriesList> groceriesLists = groceriesListService.getAllOngoingLists(startingTime);
        return new ResponseEntity<Collection<GroceriesList>>(groceriesLists, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/groceries/getListsByRestaurantId/{restaurantId}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<GroceriesList>> getListsByRestaurantId(@PathVariable Integer restaurantId) {
		Collection<GroceriesList> groceriesLists = groceriesListService.getListsByRestaurantId(restaurantId);
        return new ResponseEntity<Collection<GroceriesList>>(groceriesLists, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/groceries/addListActive/{id}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> addGroceriesListActive(@PathVariable Integer id) {
		Integer indexOfUpdatedList = groceriesListService.setActiveToFalse(false, id);
        return new ResponseEntity<Integer>(indexOfUpdatedList, HttpStatus.OK);
    }
	
	
	
}
