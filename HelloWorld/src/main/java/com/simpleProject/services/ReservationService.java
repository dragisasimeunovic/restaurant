package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.Reservation;
import com.simpleProject.model.Tablee;
import com.simpleProject.repository.ReservationRepository;

@Service
public class ReservationService {

	
	@Autowired
	private ReservationRepository reservationRepository;
	
	
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
		return reservationRepository.findByGuestIdAndLeavingTimeGreaterThan(guestId, comingTime);
	}
	
	public Collection<Reservation> getAllTermReservations(String guestId, Integer restaurantId, String comingTime, String leavingTime) {
		return reservationRepository.findByGuestIdAndRestaurantIdAndComingTimeAndLeavingTime(guestId, restaurantId, comingTime, leavingTime);
	}

	public Integer cancelReservation(String guestId, Integer restaurantId, String comingTime, String leavingTime) {
		return reservationRepository.deleteByGuestIdAndRestaurantIdAndComingTimeAndLeavingTime(guestId, restaurantId, comingTime, leavingTime);
	}

	public Reservation isTableAllreadyReserved(Integer restaurantId, Tablee restaurantTable, String comingTime,
			String leavingTime) {
		return reservationRepository.findByRestaurantIdAndReservedTableAndComingTimeLessThanAndLeavingTimeGreaterThanOrRestaurantIdAndReservedTableAndComingTimeGreaterThanAndComingTimeLessThanAndLeavingTimeGreaterThanOrRestaurantIdAndReservedTableAndComingTimeLessThanAndLeavingTimeLessThanAndLeavingTimeGreaterThanOrRestaurantIdAndReservedTableAndComingTimeGreaterThanAndLeavingTimeLessThan
				(restaurantId, restaurantTable, comingTime, leavingTime, 
						restaurantId, restaurantTable,comingTime, leavingTime, leavingTime, 
						restaurantId, restaurantTable,comingTime, leavingTime, comingTime,
						restaurantId, restaurantTable,comingTime, leavingTime);

	}
	
}
