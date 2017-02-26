package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.WaiterMark;
import com.simpleProject.repository.WaiterMarkRepository;

@Service
public class WaiterMarkService {

	@Autowired
	private WaiterMarkRepository waiterMarkRepository;

	public WaiterMark add(WaiterMark vm) {
		return waiterMarkRepository.save(vm);
	}

	public Collection<WaiterMark> getWaiterMark(String email) {
		return waiterMarkRepository.findByWaiterEmail(email);
	}
	
	
	
}
