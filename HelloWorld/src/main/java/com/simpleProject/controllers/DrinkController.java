package com.simpleProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.services.DrinkService;

@RestController
public class DrinkController {
	
	@Autowired
	DrinkService drinkService;
	
	

}
