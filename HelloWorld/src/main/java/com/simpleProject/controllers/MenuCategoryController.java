package com.simpleProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.services.MenuCategoryService;

@RestController
public class MenuCategoryController {
	
	@Autowired
	private MenuCategoryService menuCategoryService;

}
