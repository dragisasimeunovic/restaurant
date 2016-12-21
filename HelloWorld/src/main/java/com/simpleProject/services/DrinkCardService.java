package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.DrinkCard;
import com.simpleProject.model.Menu;
import com.simpleProject.repository.DrinkCardRepository;

@Service
public class DrinkCardService {
	
	@Autowired
	DrinkCardRepository drinkCardRepository;
	
	public Collection<DrinkCard> getAll(){
		return drinkCardRepository.findAll();
	}

	
	public DrinkCard add(DrinkCard drinkCard){
		return drinkCardRepository.save(drinkCard);
	}
	


}
