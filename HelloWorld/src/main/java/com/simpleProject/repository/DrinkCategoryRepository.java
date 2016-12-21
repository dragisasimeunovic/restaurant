package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.DrinkCategory;

public interface DrinkCategoryRepository extends JpaRepository<DrinkCategory, Integer> {

}
