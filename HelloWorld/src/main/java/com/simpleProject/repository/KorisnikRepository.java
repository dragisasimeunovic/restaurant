package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Korisnik;

public interface KorisnikRepository extends JpaRepository<Korisnik, String> {

}
