package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {

}
