package com.simpleProject.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.simpleProject.model.DrinkOrderItem;

public interface DrinkOrderItemRepository extends JpaRepository<DrinkOrderItem, Integer>{
	
	@Transactional
	@Modifying
	@Query("update DrinkOrderItem doi set doi.isPrepared = ?1 where doi.id = ?2")
	public Integer setIsPreparedForDrinkOrderItem(Boolean prepared, Integer id);

}
