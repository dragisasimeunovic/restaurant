package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.DrinkCategory;
import com.simpleProject.model.MenuCategory;

public interface DrinkCategoryRepository extends JpaRepository<DrinkCategory, Integer> {
	
	
	public Collection<DrinkCategory> findByIdDrinkCard(Integer idDrinkCard);

}
