package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer>{

}
