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
	
	public Collection<Korisnik> findAllGuestsWithNameAndSurname(String name, String surname){
		return korisnikRepository.findByImeAndPrezime(name, surname);
	}
	
	public Collection<Korisnik> getAllGuestsOrderByName(){
		return korisnikRepository.findByTipOrderByImeAsc("gost");
	}
	
	public Collection<Korisnik> getAllGuestsOrderByNameDesc(){
		return korisnikRepository.findByTipOrderByImeDesc("gost");
	}
	

	
	public Korisnik add(Korisnik korisnik){
		return korisnikRepository.save(korisnik);
	}
	
	public Korisnik getOne(String id){
		/*ArrayList<Korisnik> korisnici = new ArrayList<Korisnik>();
		korisnici = (ArrayList<Korisnik>) korisnikRepository.findAll();
		System.out.println(korisnici.size());
		for(Korisnik korisnik:korisnici){
			if(korisnik.getEmail().equals(id)){
				System.out.println(korisnik.getEmail());
				return korisnik;
			}
		}*/
		return korisnikRepository.findOne(id);
		
	}
	
}
