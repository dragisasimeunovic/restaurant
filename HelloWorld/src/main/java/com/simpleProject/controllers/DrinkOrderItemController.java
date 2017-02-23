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

import com.simpleProject.model.DrinkOrderItem;
import com.simpleProject.model.DrinkOrderList;
import com.simpleProject.services.DrinkOrderItemService;
import com.simpleProject.services.DrinkOrderListService;

@RestController
public class DrinkOrderItemController {

	@Autowired
	private DrinkOrderItemService drinkOrderItemService;
	
	@Autowired
	private DrinkOrderListService drinkOrderListService;
	
	@RequestMapping(
            value    = "/api/drinkOrder/addListItem/{id}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<DrinkOrderItem> addGroceriesListItem(@RequestBody DrinkOrderItem doi, @PathVariable Integer id) {
		DrinkOrderList dol = drinkOrderListService.getById(id);
		doi.setDrinkOrderList(dol);
		DrinkOrderItem a = drinkOrderItemService.add(doi);
        return new ResponseEntity<DrinkOrderItem>(a, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/drinkOrder/setPreparedForListItem/{id}/{prepared}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> setPreparedForListItem(@PathVariable Integer id, @PathVariable Boolean prepared) {
		Integer a = drinkOrderItemService.setPreparedForDrinkOrderItem(prepared, id);
        return new ResponseEntity<Integer>(a, HttpStatus.OK);
    }
	
}
