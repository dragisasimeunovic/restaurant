package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.DrinkOrderItem;

public interface DrinkOrderRepository extends JpaRepository<DrinkOrderItem, Integer>{

}
