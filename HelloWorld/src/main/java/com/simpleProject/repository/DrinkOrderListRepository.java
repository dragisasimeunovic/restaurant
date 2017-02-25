package com.simpleProject.repository;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.simpleProject.model.DrinkOrderList;

public interface DrinkOrderListRepository extends JpaRepository<DrinkOrderList, Integer>{

	public Collection<DrinkOrderList> findByRestaurantIdAndIsServed(Integer restaurantId, Boolean isServed);
	
	
	@Transactional
	@Modifying
	@Query("update DrinkOrderList dol set dol.isServed = ?1, dol.isPaid = ?2 where dol.id = ?3")
	public Integer setIsServedIPaidForDrinkOrderList(Boolean isServed, Boolean isPaid, Integer id);
	
	
	
	public Collection<DrinkOrderList> findByIsPaid(Boolean isPaid);
}
