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

import com.simpleProject.model.Reservation;
import com.simpleProject.services.ReservationService;

@RestController
public class ReservationController {

	@Autowired
	private ReservationService reservationService;
	
	
	@RequestMapping(
            value    = "/api/reservation/addReservation",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Reservation> addReservation(@RequestBody Reservation reservation) {
		Reservation savedReservation = reservationService.addReservation(reservation);
        return new ResponseEntity<Reservation>(savedReservation, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/reservation/getByGuestIdAndComingTime/{guestId:.+}/{comingTime}",
            method   = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Reservation>> getReservationByGuestIdAndComingTime(@PathVariable String guestId, @PathVariable String comingTime) {
		Collection<Reservation> reservations = reservationService.getByGuestIdAndComingTime(guestId, comingTime);
        return new ResponseEntity<Collection<Reservation>>(reservations, HttpStatus.OK);
    }
	
	
	@RequestMapping(
    		value = "api/reservation/cancelReservation/{id}",
    		method = RequestMethod.POST,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> cancelReservation(@PathVariable Integer id){
		Reservation reservation = reservationService.getReservationById(id);
		String guestId = reservation.getGuestId();
		String comingTime = reservation.getComingTime();
		String leavingTime = reservation.getLeavingTime();
		Integer restaurantId = reservation.getRestaurantId();
		Integer deletedReservation = reservationService.cancelReservation(guestId, restaurantId, comingTime, leavingTime);
    	return new ResponseEntity<Integer>(deletedReservation, HttpStatus.OK);
    }
	
	
	
}
