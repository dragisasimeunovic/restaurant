package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.Korisnik;
import com.simpleProject.model.Shift;
import com.simpleProject.repository.ShiftRepository;

@Service
public class ShiftService {

	@Autowired
	ShiftRepository shiftRepository;
	
	public Shift addShift(Shift shift){
		return shiftRepository.save(shift);
	}
	
	public Collection<Shift> findRestaurantsShifts(Integer restaurantId){
		return shiftRepository.findByRestaurantId(restaurantId);
	}

	public Collection<Shift> findShiftsForEmployee(Korisnik employee, Integer restaurantId) {
		return shiftRepository.findByEmployeeAndRestaurantId(employee, restaurantId);
	}
	
	
	
}
