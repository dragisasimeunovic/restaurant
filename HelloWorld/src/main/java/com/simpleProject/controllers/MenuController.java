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

import com.simpleProject.model.Korisnik;
import com.simpleProject.model.Menu;
import com.simpleProject.services.MenuService;

@RestController
public class MenuController {
	
	@Autowired
	private MenuService menuService;
	
	@RequestMapping(
            value    = "/api/menu/addMenu",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Menu> addMenu(@RequestBody Menu menu) {
        Menu addingMenu= menuService.add(menu);
        return new ResponseEntity<Menu>(addingMenu, HttpStatus.OK);
    }
	
/*	@RequestMapping(
    		value = "/api/menu/{restaurantId}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Menu> getMenuByRestaurantId(@PathVariable Integer restaurantId){
    	Menu menuByRestaurant = menuService.getMenuByRestaurantId(restaurantId);
    	return new ResponseEntity<Menu>(menuByRestaurant, HttpStatus.OK);
    }*/
}
