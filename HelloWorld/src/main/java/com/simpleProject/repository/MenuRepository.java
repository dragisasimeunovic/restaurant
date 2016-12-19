package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.simpleProject.model.Menu;

public interface MenuRepository extends JpaRepository<Menu, Integer>  {

	/*@Query("select m from Menu m where m.idRestaurant = :idRestaurant")*/
	//public Menu getByRestaurantId(Integer restaurantId);
	
}
