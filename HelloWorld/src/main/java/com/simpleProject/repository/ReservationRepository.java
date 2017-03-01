package com.simpleProject.repository;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Reservation;
import com.simpleProject.model.Tablee;

public interface ReservationRepository extends JpaRepository<Reservation, Integer>{

	public Collection<Reservation> findByGuestIdAndLeavingTimeGreaterThan(String guestId, String comingTime);
	public Collection<Reservation> findByGuestIdAndRestaurantIdAndComingTimeAndLeavingTime(String guestId, Integer restaurantId, String comingTime, String leavingTime);
	
	@Transactional
	public Integer deleteByGuestIdAndRestaurantIdAndComingTimeAndLeavingTime(String guestId, Integer restaurantId, String comingTime, String leavingTime);
	
	
	public Reservation findByRestaurantIdAndReservedTableAndComingTimeLessThanAndLeavingTimeGreaterThanOrRestaurantIdAndReservedTableAndComingTimeGreaterThanAndComingTimeLessThanAndLeavingTimeGreaterThanOrRestaurantIdAndReservedTableAndComingTimeLessThanAndLeavingTimeLessThanAndLeavingTimeGreaterThanOrRestaurantIdAndReservedTableAndComingTimeGreaterThanAndLeavingTimeLessThan(
			Integer restaurantId, Tablee restaurantTable, String comingTime, String leavingTime, Integer restaurantId2,
			Tablee restaurantTable2, String comingTime2, String leavingTime2, String leavingTime3,
			Integer restaurantId3, Tablee restaurantTable3, String comingTime3, String leavingTime4, String comingTime4,
			Integer restaurantId4, Tablee restaurantTable4, String comingTime5, String leavingTime5);
	
}
