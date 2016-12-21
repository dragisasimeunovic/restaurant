package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.Drink;
import com.simpleProject.model.DrinkCard;
import com.simpleProject.repository.DrinkRepository;

@Service
public class DrinkService {
	
	@Autowired
	DrinkRepository drinkRepository;
	
	public Collection<Drink> getAll(){
		return drinkRepository.findAll();
	}

	
	public Drink add(Drink drink){
		return drinkRepository.save(drink);
	}


}
