package com.simpleProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.services.DrinkCategoryService;

@RestController
public class DrinkCategoryController {
	
	@Autowired
	DrinkCategoryService drinkCategoryService;

}
