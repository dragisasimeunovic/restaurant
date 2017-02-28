package com.simpleProject.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.simpleProject.model.MealOrderItem;

public interface MealOrderItemRepository extends JpaRepository<MealOrderItem, Integer>{

	@Transactional
	@Modifying
	@Query("update MealOrderItem doi set doi.isPrepared = ?1 where doi.id = ?2")
	public Integer setIsPreparedForMealOrderItem(Boolean prepared, Integer id);
	
}
