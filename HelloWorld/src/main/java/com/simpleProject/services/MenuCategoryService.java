package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.simpleProject.model.MenuCategory;
import com.simpleProject.repository.MenuCategoryRepository;


@Service
public class MenuCategoryService {
	
	@Autowired
	MenuCategoryRepository menuCategoryRepository;
	
	public Collection<MenuCategory> getAll(){
		return menuCategoryRepository.findAll();
	}

	
	public MenuCategory add(MenuCategory menuCategory){
		return menuCategoryRepository.save(menuCategory);
	}

}
