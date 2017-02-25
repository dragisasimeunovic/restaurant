package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Korisnik;
import com.simpleProject.model.Shift;

public interface ShiftRepository extends JpaRepository<Shift, Integer>{
	
	public Collection<Shift> findByRestaurantId(Integer restaurantId);
	
	public Collection<Shift> findByEmployeeAndRestaurantId(Korisnik employee, Integer restaurantId);
	
	public Shift findByEmployeeAndRestaurantIdAndStartsAtLessThanAndEndsAtGreaterThan(Korisnik employee, 
			Integer restaurantId, String startsAt, String endsAt);
	
}
