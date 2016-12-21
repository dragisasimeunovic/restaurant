package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Drink;
import com.simpleProject.model.DrinkCard;
import com.simpleProject.model.Menu;

public interface DrinkRepository extends JpaRepository<Drink, Integer>{

	
}
