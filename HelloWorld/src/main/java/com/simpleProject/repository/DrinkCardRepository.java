package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.DrinkCard;

public interface DrinkCardRepository extends JpaRepository<DrinkCard, Integer> {

	public DrinkCard findByIdRestaurant(Integer restaurantId);
}
