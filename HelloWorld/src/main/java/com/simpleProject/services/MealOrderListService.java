package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.Korisnik;
import com.simpleProject.model.MealOrderList;
import com.simpleProject.repository.MealOrderListRepository;

@Service
public class MealOrderListService {

	@Autowired
	private MealOrderListRepository mealOrderListRepository;

	public MealOrderList add(MealOrderList dol) {
		return mealOrderListRepository.save(dol);
	}

	public MealOrderList getById(Integer id) {
		return mealOrderListRepository.findOne(id);
	}
	
	public Collection<MealOrderList> getByRestaurantIdAndNonServed(Integer restaurantId, Boolean isServed) {
		return mealOrderListRepository.findByRestaurantIdAndIsServed(restaurantId, isServed);
	}

	public Integer setServedOrPaid(Boolean isServed, Boolean isPaid, Integer id, Korisnik waiter, String datePaid) {
		if (isPaid == false) {
			datePaid = null;
			waiter = null;
		}
		return mealOrderListRepository.setIsServedIPaidForMealOrderList(isServed, isPaid, id, waiter, datePaid);
	}

	public Collection<MealOrderList> getByRestaurantIdAndNonServedOrNotPaid(Integer restaurantId, Boolean b) {
		return mealOrderListRepository.findByIsPaid(false);
	}

	public Collection<MealOrderList> getAllUserOrdersForRating(String email) {
		return mealOrderListRepository.findByGuestIdAndIsRatedAndIsPaid(email, false, true);
	}
	
	public Integer setRatedForMealOrderList(Integer id){
		return mealOrderListRepository.setIsRatedForMealOrderList(true, id);
	}
	
	
	public Collection<MealOrderList> getProfitsInRange(Integer restaurantId, String date1, String date2) {
		return mealOrderListRepository.findByRestaurantIdAndDatePaidBetween(restaurantId, date1, date2);
	}
	
	
	public Collection<MealOrderList> getVisitsInRange(Boolean isPaid, Integer restaurantId, String date1, String date2) {
		return mealOrderListRepository.findByIsPaidAndRestaurantIdAndDatePaidBetween(isPaid, restaurantId, date1, date2);
	}

	public Collection<MealOrderList> getProfitsForWaiter(Integer restaurantId, Korisnik waiter) {
		return mealOrderListRepository.findByRestaurantIdAndWaiter(restaurantId, waiter);
	}
	
}
