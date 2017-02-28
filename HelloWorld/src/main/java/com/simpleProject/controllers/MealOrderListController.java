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
import com.simpleProject.model.Korisnik;
import com.simpleProject.model.MealOrderList;
import com.simpleProject.services.DrinkOrderListService;
import com.simpleProject.services.KorisnikService;
import com.simpleProject.services.MealOrderListService;

@RestController
public class MealOrderListController {

	
	@Autowired
	private MealOrderListService mealOrderListService;
	
	@Autowired
	private KorisnikService korisnikService;
	
	@RequestMapping(
            value    = "/api/mealOrderList/addList",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<MealOrderList> adMealOrderList(@RequestBody MealOrderList dol) {
		MealOrderList d = mealOrderListService.add(dol);
        return new ResponseEntity<MealOrderList>(d, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/mealOrderList/getAllRestaurantNonservedLists/{restaurantId}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<MealOrderList>> getNonservedLists(@PathVariable Integer restaurantId) {
		Collection<MealOrderList> d = mealOrderListService.getByRestaurantIdAndNonServed(restaurantId, false);
        return new ResponseEntity<Collection<MealOrderList>>(d, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/mealOrderList/getAllRestaurantNonservedOrNonpaidLists/{restaurantId}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<MealOrderList>> getNonservedOrNonpaidLists(@PathVariable Integer restaurantId) {
		Collection<MealOrderList> d = mealOrderListService.getByRestaurantIdAndNonServedOrNotPaid(restaurantId, false);
		return new ResponseEntity<Collection<MealOrderList>>(d, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/mealOrderList/setServedOrPaid/{served}/{paid}/{id}/{waiterEmail}/{datePaid}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> setServedOrPaid(@PathVariable Boolean served, @PathVariable Boolean paid, @PathVariable Integer id, @PathVariable String waiterEmail, @PathVariable String datePaid) {
		Korisnik konobar = korisnikService.getOne(waiterEmail);
		Integer a = mealOrderListService.setServedOrPaid(served, paid, id, konobar, datePaid);
        return new ResponseEntity<Integer>(a, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/mealOrderList/getAllUserOrdersForRating/{email:.+}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<MealOrderList>> getAllUserOrdersForRating(@PathVariable String email) {
		Collection<MealOrderList> d = mealOrderListService.getAllUserOrdersForRating(email);
		return new ResponseEntity<Collection<MealOrderList>>(d, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/mealOrderList/setIsRated/{id}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> setRated(@PathVariable Integer id) {
		Integer d = mealOrderListService.setRatedForMealOrderList(id);
		return new ResponseEntity<Integer>(d, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/mealOrderList/getProfitsInRange/{resId}/{date1}/{date2}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<MealOrderList>> getProfitsInRange(@PathVariable Integer resId, @PathVariable String date1, @PathVariable String date2) {
		Collection<MealOrderList> d = mealOrderListService.getProfitsInRange(resId, date1, date2);
		return new ResponseEntity<Collection<MealOrderList>>(d, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/mealOrderList/getProfitsForWaiter/{resId}/{waiterEmail:.+}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<MealOrderList>> getProfitsforWaiter(@PathVariable Integer resId, @PathVariable String waiterEmail) {
		Korisnik waiter = korisnikService.getOne(waiterEmail);
		Collection<MealOrderList> d = mealOrderListService.getProfitsForWaiter(resId, waiter);
		return new ResponseEntity<Collection<MealOrderList>>(d, HttpStatus.OK);
    }
	
}
