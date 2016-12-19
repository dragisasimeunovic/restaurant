package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.MenuCategory;

public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Integer> {

}
