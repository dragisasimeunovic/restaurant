package com.simpleProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.services.DrinkCardService;

@RestController
public class DrinkCardController {
	
	@Autowired
	DrinkCardService drinkCardService;
	
	

}
