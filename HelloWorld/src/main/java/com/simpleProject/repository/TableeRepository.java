package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Restaurant;
import com.simpleProject.model.Tablee;

public interface TableeRepository extends JpaRepository<Tablee, Integer>{
	
	public Restaurant findById(Integer id);
	public Collection<Tablee> findByIdRestaurant(Integer idRestaurant);
	public Tablee findByIdRestaurantAndNumber(Integer idRestaurant, String number);

}
