package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Menu;

public interface MenuRepository extends JpaRepository<Menu, Integer>  {

	public Menu findByIdRestaurant(Integer restaurantId);
	
}
