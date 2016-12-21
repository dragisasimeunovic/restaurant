package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Korisnik;

public interface KorisnikRepository extends JpaRepository<Korisnik, String> {

	public Collection<Korisnik> findByTip(String type);
	public Collection<Korisnik> findByImeAndPrezime(String name, String surname);
}
