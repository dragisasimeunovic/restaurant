package com.simpleProject.repository;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer>{

	public Collection<Reservation> findByGuestIdAndComingTimeGreaterThan(String guestId, String comingTime);
	public Collection<Reservation> findByGuestIdAndRestaurantIdAndComingTimeAndLeavingTime(String guestId, Integer restaurantId, String comingTime, String leavingTime);
	
	@Transactional
	public Integer deleteByGuestIdAndRestaurantIdAndComingTimeAndLeavingTime(String guestId, Integer restaurantId, String comingTime, String leavingTime);
	
}
