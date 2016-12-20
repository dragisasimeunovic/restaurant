package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Meal;
import com.simpleProject.model.Menu;

public interface MealRepository extends JpaRepository<Meal, Integer>{

	public Collection<Meal> findByIdMenuCategory(Integer idMenuCategory);
	
}
