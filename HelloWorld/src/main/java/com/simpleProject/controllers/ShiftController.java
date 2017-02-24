package com.simpleProject.controllers;

import java.util.Collection;

import org.assertj.core.error.ShouldBeInThePast;
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
import com.simpleProject.model.Korisnik;
import com.simpleProject.model.Reservation;
import com.simpleProject.model.Shift;
import com.simpleProject.services.KorisnikService;
import com.simpleProject.services.ShiftService;

@RestController
public class ShiftController {
	
	@Autowired
	private ShiftService shiftService;
	
	@Autowired
	private KorisnikService korisnikService;
	
	@RequestMapping(
            value    = "/api/shift/addShift",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Shift> addShift(@RequestBody Shift shift) {
		Shift savedShift = shiftService.addShift(shift);
        return new ResponseEntity<Shift>(savedShift, HttpStatus.OK);
    }
	
	@RequestMapping(
    		value = "api/shift/findShifts/{id}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Shift>> findShifts(@PathVariable Integer id){
		Collection<Shift> shifts = shiftService.findRestaurantsShifts(id);
    	return new ResponseEntity<Collection<Shift>>(shifts, HttpStatus.OK);
    }
	
	@RequestMapping(
    		value = "api/shift/findShiftsForEmployee/{email:.+}/{restaurantId}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Shift>> findShiftsForEmployee(@PathVariable String email, @PathVariable Integer restaurantId){
		Korisnik korisnik = korisnikService.getOne(email);
		Collection<Shift> shifts = shiftService.findShiftsForEmployee(korisnik, restaurantId);
    	return new ResponseEntity<Collection<Shift>>(shifts, HttpStatus.OK);
    }
	
	
}
