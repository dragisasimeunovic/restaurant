package com.simpleProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.simpleProject.model.Offer;
import com.simpleProject.repository.OfferRepository;

@Service
public class OfferService {

	@Autowired
	private OfferRepository offerRepository;
	
	public Offer add(Offer offer) {
		return offerRepository.save(offer);
	}
	
	public Integer acceptedField(Boolean accepted, Integer id){
		return offerRepository.setAcceptedForOffer(accepted, id);
	}

	public Integer update(Integer price, String deliveryDate, Boolean warranty, Integer id) {
		return offerRepository.setPriceDeliveryDateWarrantyForOffer(price, deliveryDate, warranty, id);
	}
}
