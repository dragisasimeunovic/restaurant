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
	
	@RequestMapping(
            value    = "/api/drinkOrderList/getAllRestaurantNonservedLists/{restaurantId}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<DrinkOrderList>> getNonservedLists(@PathVariable Integer restaurantId) {
		Collection<DrinkOrderList> d = drinkOrderListService.getByRestaurantIdAndNonServed(restaurantId, false);
        return new ResponseEntity<Collection<DrinkOrderList>>(d, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/drinkOrderList/getAllRestaurantNonservedOrNonpaidLists/{restaurantId}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<DrinkOrderList>> getNonservedOrNonpaidLists(@PathVariable Integer restaurantId) {
		Collection<DrinkOrderList> d = drinkOrderListService.getByRestaurantIdAndNonServedOrNotPaid(restaurantId, false);
        System.out.println(d.size());
		return new ResponseEntity<Collection<DrinkOrderList>>(d, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/drinkOrderList/setServedOrPaid/{served}/{paid}/{id}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> setServedOrPaid(@PathVariable Boolean served, @PathVariable Boolean paid, @PathVariable Integer id) {
		Integer a = drinkOrderListService.setServedOrPaid(served, paid, id);
        return new ResponseEntity<Integer>(a, HttpStatus.OK);
    }
	
	
}
