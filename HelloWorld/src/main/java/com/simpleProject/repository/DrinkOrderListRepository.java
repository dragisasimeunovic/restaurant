package com.simpleProject.repository;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.simpleProject.model.DrinkOrderList;
import com.simpleProject.model.Korisnik;

public interface DrinkOrderListRepository extends JpaRepository<DrinkOrderList, Integer>{

	public Collection<DrinkOrderList> findByRestaurantIdAndIsServed(Integer restaurantId, Boolean isServed);
	
	@Transactional
	@Modifying
	@Query("update DrinkOrderList dol set dol.isServed = ?1, dol.isPaid = ?2, dol.waiter = ?4, dol.datePaid = ?5 where dol.id = ?3")
	public Integer setIsServedIPaidForDrinkOrderList(Boolean isServed, Boolean isPaid, Integer id, Korisnik waiter, String datePaid);
	
	public Collection<DrinkOrderList> findByIsPaid(Boolean isPaid);

	public Collection<DrinkOrderList> findByGuestIdAndIsRatedAndIsPaid(String email, Boolean b, Boolean c);
	
	@Transactional
	@Modifying
	@Query("update DrinkOrderList dol set dol.isRated = ?1 where dol.id = ?2")
	public Integer setIsRatedForDrinkOrderList(Boolean isRated, Integer id);
	
	public Collection<DrinkOrderList> findByRestaurantIdAndDatePaidBetween(Integer restaurantId, String date1, String date2);

	public Collection<DrinkOrderList> findByRestaurantIdAndWaiter(Integer restaurantId, Korisnik waiter);
	
	
	
	
}
