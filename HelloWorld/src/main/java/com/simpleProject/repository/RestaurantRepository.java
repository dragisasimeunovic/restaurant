package com.simpleProject.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.simpleProject.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {

	public Restaurant findById(Integer id);
	
	
	@Transactional
	@Modifying
	@Query("update Restaurant r set r.latitude = ?1, r.longitude = ?2 where r.id = ?3")
	public Integer setLatitudeLongitudeForRestaurant(Double latitude, Double longitude, Integer id);
	
}
