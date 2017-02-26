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

import com.simpleProject.model.RestaurantMark;
import com.simpleProject.services.RestaurantMarkService;

@RestController
public class RestaurantMarkController {

	@Autowired
	private RestaurantMarkService restaurantMarkService;
	
	@RequestMapping(
            value    = "/api/marks/addRestaurantMark",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<RestaurantMark> addRestaurantMark(@RequestBody RestaurantMark vm) {
		RestaurantMark addingRestaurantMark= restaurantMarkService.add(vm);
        return new ResponseEntity<RestaurantMark>(addingRestaurantMark, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/marks/getRestaurantMarkForUser/{email:.+}/{id}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<RestaurantMark>> getRestaurantMarkForUser(@PathVariable String email, @PathVariable Integer id) {
		Collection<RestaurantMark> restaurantMarks = restaurantMarkService.ratedUserRestaurant(email, id);
        return new ResponseEntity<Collection<RestaurantMark>>(restaurantMarks, HttpStatus.OK);
    }
	
}
