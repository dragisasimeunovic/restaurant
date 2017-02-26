package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.WaiterMark;

public interface WaiterMarkRepository extends JpaRepository<WaiterMark, Integer>{

	public Collection<WaiterMark> findByWaiterEmail(String waiterEmail);

}
