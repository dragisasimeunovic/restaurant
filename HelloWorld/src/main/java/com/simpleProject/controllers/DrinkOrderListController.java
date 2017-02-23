package com.simpleProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.model.DrinkOrderList;
import com.simpleProject.services.DrinkOrderListService;

@RestController
public class DrinkOrderListController {

	
	@Autowired
	private DrinkOrderListService drinkOrderListService;
	
	@RequestMapping(
            value    = "/api/drinkOrderList/addList",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<DrinkOrderList> adDrinkOrderList(@RequestBody DrinkOrderList dol) {
		DrinkOrderList d = drinkOrderListService.add(dol);
        return new ResponseEntity<DrinkOrderList>(d, HttpStatus.OK);
    }
	
}
