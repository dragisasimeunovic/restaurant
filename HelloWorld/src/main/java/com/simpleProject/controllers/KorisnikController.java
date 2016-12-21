package com.simpleProject.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.model.Korisnik;
import com.simpleProject.services.KorisnikService;

@RestController
public class KorisnikController {


    @Autowired
    private KorisnikService korisnikService;
    
    @RequestMapping(
            value    = "/api/korisnici/korisnik",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Korisnik> registerKorisnik(@RequestBody Korisnik korisnik) {
        Korisnik registrovanKorisnik = korisnikService.add(korisnik);
        return new ResponseEntity<Korisnik>(registrovanKorisnik, HttpStatus.OK);
    }
    
    @RequestMapping(
    		value = "/api/korisnici/{email:.+}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Korisnik> emailKorisnika(@PathVariable String email){
    	Korisnik emailKorisnika1 = korisnikService.getOne(email);
    	return new ResponseEntity<Korisnik>(emailKorisnika1, HttpStatus.OK);
    }
    
    @RequestMapping(
    		value = "/api/korisnici/sviKorisnici",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Korisnik>> allUsers(){
    	Collection<Korisnik> sviKorisnici = korisnikService.getAll();
    	return new ResponseEntity<Collection<Korisnik>>(sviKorisnici, HttpStatus.OK);
    }
    
    @RequestMapping(
    		value = "api/korisnici/allGuests",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Korisnik>> allGuests(){
    	Collection<Korisnik> allGuests = korisnikService.getAllGuests();
    	return new ResponseEntity<Collection<Korisnik>>(allGuests, HttpStatus.OK);
    }
    
    
    
    
    @RequestMapping(
    		value = "api/korisnici/searchByNameAndSurname/{name}/{surname}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Korisnik>> allGuestsWithNameAndSurname(@PathVariable String name, @PathVariable String surname){
    	Collection<Korisnik> guests = korisnikService.findAllGuestsWithNameAndSurname(name, surname);
    	return new ResponseEntity<Collection<Korisnik>>(guests, HttpStatus.OK);
    }
    
}
