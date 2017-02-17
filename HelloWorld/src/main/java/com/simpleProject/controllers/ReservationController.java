package com.simpleProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
	
	
}
