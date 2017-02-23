package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.DrinkOrderList;

public interface DrinkOrderListRepository extends JpaRepository<DrinkOrderList, Integer>{

	public Collection<DrinkOrderList> findByRestaurantIdAndIsServed(Integer restaurantId, Boolean isServed);
	
	
}
