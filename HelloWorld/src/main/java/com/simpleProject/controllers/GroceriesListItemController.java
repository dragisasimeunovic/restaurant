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
import com.simpleProject.model.GroceriesListItem;
import com.simpleProject.services.GroceriesListItemService;
import com.simpleProject.services.GroceriesListService;

@RestController
public class GroceriesListItemController {

	@Autowired
	private GroceriesListItemService groceriesListItemService;
	
	
	@Autowired
	private GroceriesListService groceriesListService;
	
	@RequestMapping(
            value    = "/api/groceries/addListItem/{id}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<GroceriesListItem> addGroceriesListItem(@RequestBody GroceriesListItem grItem, @PathVariable Integer id) {
		GroceriesList groceriesList = groceriesListService.getById(id);
		grItem.setGl(groceriesList);
		GroceriesListItem addingGroceriesLI = groceriesListItemService.add(grItem);
        return new ResponseEntity<GroceriesListItem>(addingGroceriesLI, HttpStatus.OK);
    }
	
}
