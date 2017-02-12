package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.simpleProject.model.DrinkCard;

@Repository
public interface DrinkCardRepository extends JpaRepository<DrinkCard, Integer> {

	public DrinkCard findByIdRestaurant(Integer restaurantId);
}
