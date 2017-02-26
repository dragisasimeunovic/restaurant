package com.simpleProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.model.DrinkMark;
import com.simpleProject.services.DrinkMarkService;

@RestController
public class DrinkMarkController {

	@Autowired
	private DrinkMarkService drinkMarkService;
	
	@RequestMapping(
            value    = "/api/marks/addDrinkMark",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<DrinkMark> addDrink(@RequestBody DrinkMark drinkM) {
		DrinkMark addingDrinkMark = drinkMarkService.add(drinkM);
        return new ResponseEntity<DrinkMark>(addingDrinkMark, HttpStatus.OK);
    }
	
	
}
