package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Drink;

public interface DrinkRepository extends JpaRepository<Drink, Integer>{

}
