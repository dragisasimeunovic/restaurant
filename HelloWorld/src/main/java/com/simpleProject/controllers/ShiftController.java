package com.simpleProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.model.DrinkOrder;
import com.simpleProject.model.Shift;
import com.simpleProject.services.ShiftService;

@RestController
public class ShiftController {
	
	@Autowired
	private ShiftService shiftService;
	
	@RequestMapping(
            value    = "/api/shift/addShift",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Shift> addShift(@RequestBody Shift shift) {
		Shift savedShift = shiftService.addShift(shift);
        return new ResponseEntity<Shift>(savedShift, HttpStatus.OK);
    }
	
	
}
