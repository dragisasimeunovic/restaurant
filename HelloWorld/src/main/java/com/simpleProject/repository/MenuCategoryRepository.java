package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.MenuCategory;

public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Integer> {

	public Collection<MenuCategory> findByIdMenu(Integer idMenu);//tj. id Restorana
	
}
