package com.simpleProject.repository;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.simpleProject.model.Korisnik;
import com.simpleProject.model.MealOrderList;

public interface MealOrderListRepository extends JpaRepository<MealOrderList, Integer>{

public Collection<MealOrderList> findByRestaurantIdAndIsServed(Integer restaurantId, Boolean isServed);
	
	@Transactional
	@Modifying
	@Query("update MealOrderList dol set dol.isServed = ?1, dol.isPaid = ?2, dol.waiter = ?4, dol.datePaid = ?5 where dol.id = ?3")
	public Integer setIsServedIPaidForMealOrderList(Boolean isServed, Boolean isPaid, Integer id, Korisnik waiter, String datePaid);
	
	public Collection<MealOrderList> findByIsPaid(Boolean isPaid);

	public Collection<MealOrderList> findByGuestIdAndIsRatedAndIsPaid(String email, Boolean b, Boolean c);
	
	@Transactional
	@Modifying
	@Query("update MealOrderList dol set dol.isRated = ?1 where dol.id = ?2")
	public Integer setIsRatedForMealOrderList(Boolean isRated, Integer id);
	
	public Collection<MealOrderList> findByRestaurantIdAndDatePaidBetween(Integer restaurantId, String date1, String date2);

	public Collection<MealOrderList> findByRestaurantIdAndWaiter(Integer restaurantId, Korisnik waiter);
	
	
	public Collection<MealOrderList> findByIsPaidAndRestaurantIdAndDatePaidBetween(Boolean isPaid,Integer restaurantId, String date1, String date2);

	
	
}
