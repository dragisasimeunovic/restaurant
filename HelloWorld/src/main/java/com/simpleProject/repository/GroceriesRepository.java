package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Groceries;

public interface GroceriesRepository extends JpaRepository<Groceries, Integer>{

}
