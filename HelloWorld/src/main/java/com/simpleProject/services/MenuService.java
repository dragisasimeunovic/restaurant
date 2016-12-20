package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.Menu;
import com.simpleProject.repository.MenuRepository;

@Service
public class MenuService {
	

	@Autowired
	MenuRepository menuRepository;
	
	
	public Collection<Menu> getAll(){
		return menuRepository.findAll();
	}

	
	public Menu add(Menu menu){
		return menuRepository.save(menu);
	}
	
	public Menu getMenuByRestaurantId(Integer restaurantId){
		return menuRepository.findByIdRestaurant(restaurantId);
	}
}
