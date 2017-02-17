package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.DrinkOrder;

public interface DrinkOrderRepository extends JpaRepository<DrinkOrder, Integer>{

}
