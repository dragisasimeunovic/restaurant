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
	
	public Reservation getReservationById(Integer id){
		return reservationRepository.getOne(id);
	}

	
	public Reservation addReservation(Reservation reservation){
		return reservationRepository.save(reservation);
	}
	
	public Collection<Reservation> getByGuestIdAndComingTime(String guestId, String comingTime){
		return reservationRepository.findByGuestIdAndComingTimeGreaterThan(guestId, comingTime);
	}
	
	public Collection<Reservation> getAllTermReservations(String guestId, Integer restaurantId, String comingTime, String leavingTime) {
		return reservationRepository.findByGuestIdAndRestaurantIdAndComingTimeAndLeavingTime(guestId, restaurantId, comingTime, leavingTime);
	}

	public Integer cancelReservation(String guestId, Integer restaurantId, String comingTime, String leavingTime) {
		return reservationRepository.deleteByGuestIdAndRestaurantIdAndComingTimeAndLeavingTime(guestId, restaurantId, comingTime, leavingTime);
	}
	
}
