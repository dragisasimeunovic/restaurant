package com.simpleProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.model.DrinkOrderItem;
import com.simpleProject.services.DrinkOrderService;

@RestController
public class DrinkOrderController {

	@Autowired
	private DrinkOrderService drinkOrderService;
	
	
	@RequestMapping(
            value    = "/api/drinkOrder/addDrinkOrder",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<DrinkOrderItem> addDrinkOrder(@RequestBody DrinkOrderItem drinkOrder) {
		DrinkOrderItem savedDrinkOrder = drinkOrderService.addDrinkOrder(drinkOrder);
        return new ResponseEntity<DrinkOrderItem>(savedDrinkOrder, HttpStatus.OK);
    }
	
	
}
