package com.simpleProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.model.WaiterMark;
import com.simpleProject.services.WaiterMarkService;

@RestController
public class WaiterMarkController {

	@Autowired
	private WaiterMarkService waiterMarkService;
	
	@RequestMapping(
            value    = "/api/marks/addWaiterMark",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<WaiterMark> addWaiterMark(@RequestBody WaiterMark vm) {
		WaiterMark addingWaiterMark= waiterMarkService.add(vm);
        return new ResponseEntity<WaiterMark>(addingWaiterMark, HttpStatus.OK);
    }
	
}
