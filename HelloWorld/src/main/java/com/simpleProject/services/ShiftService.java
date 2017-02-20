package com.simpleProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.Shift;
import com.simpleProject.repository.ShiftRepository;

@Service
public class ShiftService {

	@Autowired
	ShiftRepository shiftRepository;
	
	public Shift addShift(Shift shift){
		return shiftRepository.save(shift);
	}
	
}
