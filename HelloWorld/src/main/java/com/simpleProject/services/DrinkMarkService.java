package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.DrinkMark;
import com.simpleProject.repository.DrinkMarkRepository;

@Service
public class DrinkMarkService {
	
	@Autowired
	private DrinkMarkRepository drinkMarkRepository;

	public DrinkMark add(DrinkMark drinkM) {
		return drinkMarkRepository.save(drinkM);
	}

	public Collection<DrinkMark> getDrinkMark(Integer drinkId) {
		return drinkMarkRepository.findByDrinkId(drinkId);
	}

	
	
}
