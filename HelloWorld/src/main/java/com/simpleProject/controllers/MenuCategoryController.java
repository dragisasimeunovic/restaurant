package com.simpleProject.controllers;

import java.util.Collection;

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
import com.simpleProject.model.MenuCategory;
import com.simpleProject.repository.MenuCategoryRepository;
import com.simpleProject.services.MenuCategoryService;

@RestController
public class MenuCategoryController {
	
	@Autowired
	private MenuCategoryService menuCategoryService;
	
	@RequestMapping(
            value    = "/api/menu/addMenuCategory",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<MenuCategory> addMenuCategory(@RequestBody MenuCategory menuCategory) {
        MenuCategory addingMenuCategory= menuCategoryService.add(menuCategory);
        return new ResponseEntity<MenuCategory>(addingMenuCategory, HttpStatus.OK);
    }
	
	@RequestMapping(
    		value = "/api/menu/category/allCategoriesInMenu/{menuId}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<MenuCategory>> allCategoriesInMenu(@PathVariable Integer menuId){
    	Collection<MenuCategory> allCategories = menuCategoryService.findByIdMenu(menuId);
    	return new ResponseEntity<Collection<MenuCategory>>(allCategories, HttpStatus.OK);
    }
	

}
