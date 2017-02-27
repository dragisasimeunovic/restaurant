package com.simpleProject.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.simpleProject.model.Offer;

public interface OfferRepository extends JpaRepository<Offer, Integer>{ 

	@Transactional
	@Modifying
	@Query("update Offer o set o.accepted = ?1 where o.id = ?2")
	public Integer setAcceptedForOffer(Boolean accepted, Integer id);

	@Transactional
	@Modifying
	@Query("update Offer o set o.price = ?1, o.deliveryDate = ?2, o.warranty = ?3 where o.id = ?4")
	public Integer setPriceDeliveryDateWarrantyForOffer(Integer price, String deliveryDate, Boolean warranty, Integer id);

}
