package com.simpleProject.services;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.Korisnik;
import com.simpleProject.repository.KorisnikRepository;

@Service
public class KorisnikService {
	
	@Autowired
    KorisnikRepository korisnikRepository;
	
	public Collection<Korisnik> getAll(){
		return korisnikRepository.findAll();
	}
	
	public Collection<Korisnik> getAllGuests(){
		return korisnikRepository.findByTip("gost");
	}
	
	public Collection<Korisnik> getAllGuestsExceptActiveUser(String email){
		return korisnikRepository.findByTipAndEmailNot("gost", email);
	}
	
	public Collection<Korisnik> findAllGuestsWithNameAndSurnameAndEmailNot(String name, String surname, String email){
		return korisnikRepository.findByTipAndImeAndPrezimeAndEmailNot("gost", name, surname, email);
	}
	
	public Collection<Korisnik> getAllGuestsOrderByName(String email){
		return korisnikRepository.findByTipAndEmailNotOrderByImeAsc("gost", email);
	}
	
	public Collection<Korisnik> getAllGuestsOrderByNameDesc(String email){
		return korisnikRepository.findByTipAndEmailNotOrderByImeDesc("gost", email);
	}
	
	public Korisnik add(Korisnik korisnik){
		return korisnikRepository.save(korisnik);
	}
	
	public Korisnik getOne(String id){
		return korisnikRepository.findOne(id);
		
	}

	public Collection<Korisnik> allRestaurantEmployees() {
		return korisnikRepository.findByTipOrTipOrTip("Waiter", "Cook", "Bartender");
	}

	public Integer changeFirstLogin(String email, Integer firstLogin, String lozinka) {
		return korisnikRepository.setFirstLoginForKorisnik(firstLogin, lozinka, email);
	}
	
}
