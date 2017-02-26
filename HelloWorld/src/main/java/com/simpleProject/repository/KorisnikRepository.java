package com.simpleProject.repository;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.simpleProject.model.Korisnik;

public interface KorisnikRepository extends JpaRepository<Korisnik, String> {

	public Collection<Korisnik> findByTip(String type);
	public Collection<Korisnik> findByTipAndImeAndPrezimeAndEmailNot(String type, String name, String surname, String email);
	public Collection<Korisnik> findByTipAndEmailNotOrderByImeAsc(String type, String email);
	public Collection<Korisnik> findByTipAndEmailNotOrderByImeDesc(String type, String email);
	public Collection<Korisnik> findByTipAndEmailNot(String type, String email);
	public Collection<Korisnik> findByTipOrTipOrTip(String string, String string2, String string3);
	
	@Transactional
	@Modifying
	@Query("update Korisnik k set k.firstLogin = ?1, k.lozinka = ?2 where k.email = ?3")
	public Integer setFirstLoginForKorisnik(Integer firstLogin, String lozinka, String email);
	
	@Transactional
	@Modifying
	@Query("update Korisnik k set k.ime = ?1, k.prezime = ?2, k.dressSize = ?3, k.footwearSize = ?4 where k.email = ?5")
	public Integer setImePrezimeDressSizeFootwearSizeForKorisnik(String ime, String prezime, String dressSize,
			Integer footwearSize, String email);
	
	
	public Collection<Korisnik> findByRestoranAndTip(Integer restoran, String tip);
	
	
	
	@Transactional
	@Modifying
	@Query("update Korisnik k set k.ime = ?1 where k.email = ?2")
	public Integer setImeForKorisnik(String ime, String email);
	

}
