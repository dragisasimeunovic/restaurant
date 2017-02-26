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
import com.simpleProject.services.DrinkOrderListService;
import com.simpleProject.services.KorisnikService;

@RestController
public class DrinkOrderListController {

	
	@Autowired
	private DrinkOrderListService drinkOrderListService;
	
	@Autowired
	private KorisnikService korisnikService;
	
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
		return new ResponseEntity<Collection<DrinkOrderList>>(d, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/drinkOrderList/setServedOrPaid/{served}/{paid}/{id}/{waiterEmail}/{datePaid}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> setServedOrPaid(@PathVariable Boolean served, @PathVariable Boolean paid, @PathVariable Integer id, @PathVariable String waiterEmail, @PathVariable String datePaid) {
		Korisnik konobar = korisnikService.getOne(waiterEmail);
		Integer a = drinkOrderListService.setServedOrPaid(served, paid, id, konobar, datePaid);
        return new ResponseEntity<Integer>(a, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/drinkOrderList/getAllUserOrdersForRating/{email:.+}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<DrinkOrderList>> getAllUserOrdersForRating(@PathVariable String email) {
		Collection<DrinkOrderList> d = drinkOrderListService.getAllUserOrdersForRating(email);
		return new ResponseEntity<Collection<DrinkOrderList>>(d, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/drinkOrderList/setIsRated/{id}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> setRated(@PathVariable Integer id) {
		Integer d = drinkOrderListService.setRatedForDrinkOrderList(id);
		return new ResponseEntity<Integer>(d, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/drinkOrderList/getProfitsInRange/{resId}/{date1}/{date2}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<DrinkOrderList>> getProfitsInRange(@PathVariable Integer resId, @PathVariable String date1, @PathVariable String date2) {
		Collection<DrinkOrderList> d = drinkOrderListService.getProfitsInRange(resId, date1, date2);
		return new ResponseEntity<Collection<DrinkOrderList>>(d, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/drinkOrderList/getProfitsForWaiter/{resId}/{waiterEmail:.+}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<DrinkOrderList>> getProfitsforWaiter(@PathVariable Integer resId, @PathVariable String waiterEmail) {
		Korisnik waiter = korisnikService.getOne(waiterEmail);
		Collection<DrinkOrderList> d = drinkOrderListService.getProfitsForWaiter(resId, waiter);
		System.out.println(d.size());
		return new ResponseEntity<Collection<DrinkOrderList>>(d, HttpStatus.OK);
    }
	
	
}
