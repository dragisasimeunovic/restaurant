package com.simpleProject.repository;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.simpleProject.model.GroceriesList;

public interface GroceriesListRepository extends JpaRepository<GroceriesList, Integer>{

	public Collection<GroceriesList> findByRestaurantIdAndStartingTimeGreaterThanAndEndingTimeLessThan(Integer restaurantId, String startingTime, String endingTime);
	public Collection<GroceriesList> findByEndingTimeGreaterThan(String startingTime);
	
	
	@Transactional
	@Modifying
	@Query("update GroceriesList gl set gl.active = ?1 where gl.id = ?2")
	public Integer setActiveForGroceriesList(Boolean active, Integer id);
	
	
	public Collection<GroceriesList> findByRestaurantId(Integer restaurantId);
	
}
