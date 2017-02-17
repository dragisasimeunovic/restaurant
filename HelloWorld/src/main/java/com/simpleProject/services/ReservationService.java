package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.Reservation;
import com.simpleProject.repository.ReservationRepository;

@Service
public class ReservationService {

	
	@Autowired
	ReservationRepository reservationRepository;
	
	public Collection<Reservation> getAll(){
		return reservationRepository.findAll();
	}

	
	public Reservation addReservation(Reservation reservation){
		return reservationRepository.save(reservation);
	}
	
}
