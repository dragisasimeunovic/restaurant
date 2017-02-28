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
import com.simpleProject.model.MealOrderItem;
import com.simpleProject.model.MealOrderList;
import com.simpleProject.services.DrinkOrderItemService;
import com.simpleProject.services.DrinkOrderListService;
import com.simpleProject.services.MealOrderItemService;
import com.simpleProject.services.MealOrderListService;

@RestController
public class MealOrderItemController {
	
	
	@Autowired
	private MealOrderItemService mealOrderItemService;
	
	@Autowired
	private MealOrderListService mealOrderListService;
	
	@RequestMapping(
            value    = "/api/mealOrder/addListItem/{id}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<MealOrderItem> addGroceriesListItem(@RequestBody MealOrderItem doi, @PathVariable Integer id) {
		MealOrderList dol = mealOrderListService.getById(id);
		doi.setMealOrderList(dol);
		MealOrderItem a = mealOrderItemService.add(doi);
        return new ResponseEntity<MealOrderItem>(a, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/mealOrder/setPreparedForListItem/{id}/{prepared}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> setPreparedForListItem(@PathVariable Integer id, @PathVariable Boolean prepared) {
		Integer a = mealOrderItemService.setPreparedForMealOrderItem(prepared, id);
        return new ResponseEntity<Integer>(a, HttpStatus.OK);
    }
	
	
	
}
