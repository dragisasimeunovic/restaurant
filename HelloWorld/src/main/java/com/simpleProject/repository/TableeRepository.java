package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Restaurant;
import com.simpleProject.model.Tablee;

public interface TableeRepository extends JpaRepository<Tablee, Integer>{
	
	public Restaurant findById(Integer id);

}
