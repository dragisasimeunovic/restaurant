package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.Tablee;
import com.simpleProject.repository.TableeRepository;

@Service
public class TableeService {
	
	@Autowired
	TableeRepository tableeRepository;
	
	public Collection<Tablee> getAll(){
		return tableeRepository.findAll();
	}

	
	public Tablee add(Tablee tablee){
		return tableeRepository.save(tablee);
	}
	
	public Tablee getTableeById(Integer tableeId){
		return tableeRepository.findOne(tableeId);
	}
	
	public Collection<Tablee> getAllRestaurantTables(Integer idRestaurant){
		return tableeRepository.findByIdRestaurant(idRestaurant);
	}


	public Tablee getTableByIdRestaurantAndNumber(Integer idRestaurant, String number) {
		return tableeRepository.findByIdRestaurantAndNumber(idRestaurant, number);
	}
	
	

}
