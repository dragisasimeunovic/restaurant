package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.GroceriesListItem;

public interface GroceriesListItemRepository extends JpaRepository<GroceriesListItem, Integer>{

}
