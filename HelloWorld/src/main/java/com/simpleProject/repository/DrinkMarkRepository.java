package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.DrinkMark;

public interface DrinkMarkRepository extends JpaRepository<DrinkMark, Integer>{

	public Collection<DrinkMark> findByDrinkId(Integer drinkId);

}
