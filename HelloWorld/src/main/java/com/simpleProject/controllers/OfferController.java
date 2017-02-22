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

import com.simpleProject.model.Groceries;
import com.simpleProject.model.GroceriesCategory;
import com.simpleProject.model.GroceriesList;
import com.simpleProject.model.Offer;
import com.simpleProject.services.GroceriesCategoryService;
import com.simpleProject.services.GroceriesListService;
import com.simpleProject.services.GroceriesService;
import com.simpleProject.services.OfferService;

@RestController
public class OfferController {
	
	@Autowired
	private OfferService offerService;
	
	@Autowired
	private GroceriesListService groceriesListService;
	
	
	
	@RequestMapping(
            value    = "/api/offer/addOffer/{id}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Offer> addOffer(@RequestBody Offer offer, @PathVariable Integer id) {
		GroceriesList groceriesList = groceriesListService.getById(id);
		offer.setGl(groceriesList);
		Offer addingOffer = offerService.add(offer);
        return new ResponseEntity<Offer>(addingOffer, HttpStatus.OK);
    }
	
	
	@RequestMapping(
            value    = "/api/offer/addOfferAccepted/{id}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> addOfferAccepted(@PathVariable Integer id) {
		Integer updatingOfferIndex = offerService.acceptedField(true, id);
        return new ResponseEntity<Integer>(updatingOfferIndex, HttpStatus.OK);
    }
	

}
