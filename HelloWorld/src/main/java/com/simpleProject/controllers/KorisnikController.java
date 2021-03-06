package com.simpleProject.controllers;

import java.util.Collection;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.MailSending;
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
    public ResponseEntity<Korisnik> registerKorisnik(@RequestBody Korisnik korisnik) throws MessagingException {
        Korisnik registrovanKorisnik = korisnikService.add(korisnik);
        if (korisnik.getTip() != null && korisnik.getTip().equals("gost")){
        	MailSending.sendMail("feddelegrand17@gmail.com", "Aktivacija", "http://localhost:8099/api/korisnici/activate/"+registrovanKorisnik.getEmail());
        }
        return new ResponseEntity<Korisnik>(registrovanKorisnik, HttpStatus.OK);
    }
    
    @RequestMapping(
    		value = "/api/korisnici/activate/{email:.+}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<String> emailActivationKorisnika(@PathVariable String email){
    	Integer i = korisnikService.setActivated(true, email);
    	String s = "Account succesfully activated!";
    	return new ResponseEntity<String>(s, HttpStatus.OK);
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
    		value = "/api/korisnici/allEmployeesWithType/{restaurantId}/{typeOfEmployee}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Korisnik>> emailKorisnika(@PathVariable Integer restaurantId, @PathVariable String typeOfEmployee){
    	Collection<Korisnik> kk = korisnikService.getAllEmployeesWithType(restaurantId, typeOfEmployee);
    	return new ResponseEntity<Collection<Korisnik>>(kk, HttpStatus.OK);
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
    		value = "api/korisnici/searchByNameAndSurname/{name}/{surname}/{email:.+}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Korisnik>> allGuestsWithNameAndSurname(@PathVariable String name, @PathVariable String surname,  @PathVariable String email){
    	Collection<Korisnik> guests = korisnikService.findAllGuestsWithNameAndSurnameAndEmailNot(name, surname, email);
    	return new ResponseEntity<Collection<Korisnik>>(guests, HttpStatus.OK);
    }
    
    
    @RequestMapping(
    		value = "api/korisnici/orderByNameAtoZ/{email:.+}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Korisnik>> orderByNameAtoZ(@PathVariable String email){
    	Collection<Korisnik> guests = korisnikService.getAllGuestsOrderByName(email);
    	return new ResponseEntity<Collection<Korisnik>>(guests, HttpStatus.OK);
    }
    
    @RequestMapping(
    		value = "api/korisnici/orderByNameZtoA/{email:.+}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Korisnik>> orderByNameZtoA(@PathVariable String email){
    	Collection<Korisnik> guests = korisnikService.getAllGuestsOrderByNameDesc(email);
    	return new ResponseEntity<Collection<Korisnik>>(guests, HttpStatus.OK);
    }
    
    @RequestMapping(
    		value = "api/korisnici/allGuestsExceptActiveUser/{email:.+}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Korisnik>> allGuestsExceptActiveUser(@PathVariable String email){
    	Collection<Korisnik> guestsExceptActiveUser = korisnikService.getAllGuestsExceptActiveUser(email);
    	return new ResponseEntity<Collection<Korisnik>>(guestsExceptActiveUser, HttpStatus.OK);
    }
    
    @RequestMapping(
    		value = "api/korisnici/allRestaurantEmployees",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Korisnik>> allRestaurantEmployees(){
    	Collection<Korisnik> allRestaurantEmployees = korisnikService.allRestaurantEmployees();
    	return new ResponseEntity<Collection<Korisnik>>(allRestaurantEmployees, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/bidder/addBidder",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Korisnik> addBidder(@RequestBody Korisnik bidder) {
		Korisnik addingBidder = korisnikService.add(bidder);
        return new ResponseEntity<Korisnik>(addingBidder, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/korisnik/setFirstLogin/{email:.+}/{firstLogin}/{password}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> firstLoginChange(@PathVariable String email, @PathVariable Integer firstLogin, @PathVariable String password) {
		Integer i = korisnikService.changeFirstLogin(email, firstLogin, password);
        return new ResponseEntity<Integer>(i, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/korisnik/aboutChange/{ime}/{prezime}/{dressSize}/{footwearSize}/{email:.+}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> aboutChange(@PathVariable String ime, @PathVariable String prezime, @PathVariable String dressSize, @PathVariable Integer footwearSize, @PathVariable String email) {
		Integer i = korisnikService.changeAbout(ime, prezime, dressSize, footwearSize, email);
        return new ResponseEntity<Integer>(i, HttpStatus.OK);
    }
	
	@RequestMapping(
            value    = "/api/korisnik/aboutChangeGuest/{ime}/{prezime}/{email:.+}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> aboutChangeGuest(@PathVariable String ime, @PathVariable String prezime, @PathVariable String email) {
		Integer i = korisnikService.changeAboutGuest(ime, prezime, email);
        return new ResponseEntity<Integer>(i, HttpStatus.OK);
    }

	@RequestMapping(
            value    = "/api/korisnik/aboutBidderChange/{ime}/{email:.+}",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Integer> aboutBidderChange(@PathVariable String ime, @PathVariable String email) {
		Integer i = korisnikService.changeAboutBidder(ime, email);
        return new ResponseEntity<Integer>(i, HttpStatus.OK);
    }
	
	
	
    
    
}
