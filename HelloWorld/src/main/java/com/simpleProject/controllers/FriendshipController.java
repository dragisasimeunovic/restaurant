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

import com.simpleProject.model.FriendRequest;
import com.simpleProject.model.Friendship;
import com.simpleProject.model.Korisnik;
import com.simpleProject.services.FriendshipService;
import com.simpleProject.services.KorisnikService;

@RestController
public class FriendshipController {
	
	
	@Autowired
    private FriendshipService friendshipService;
	
	
	@Autowired
    private KorisnikService korisnikService;
	
    
    @RequestMapping(
            value    = "/api/friendship/addFriendship",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Friendship> sendFS(@RequestBody Friendship fs) {
    	Friendship friendship = friendshipService.sendFS(fs);
        return new ResponseEntity<Friendship>(friendship, HttpStatus.OK);
    }
    
    @RequestMapping(
    		value = "api/friendship/getAllFriends/{email:.+}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Friendship>> getAllFriends(@PathVariable String email){
    	Collection<Friendship> friends = friendshipService.getAllFriends(email);
    	return new ResponseEntity<Collection<Friendship>>(friends, HttpStatus.OK);
    }
    
    @RequestMapping(
    		value = "api/friendship/getFriendship/{firstEmail:.+}/{secondEmail:.+}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Friendship>> getFriendship(@PathVariable String firstEmail, @PathVariable String secondEmail){
    	Korisnik secondUser = korisnikService.getOne(secondEmail);
    	Collection<Friendship> friendship = friendshipService.getFriendship(firstEmail, secondUser);
    	return new ResponseEntity<Collection<Friendship>>(friendship, HttpStatus.OK);
    }
    
    @RequestMapping(
    		value = "api/friendship/deleteFriendship/{firstEmail:.+}/{secondEmail:.+}",
    		method = RequestMethod.POST,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<Friendship>> deleteFriendship(@PathVariable String firstEmail, @PathVariable String secondEmail){
    	Korisnik secondUser = korisnikService.getOne(secondEmail);
    	Collection<Friendship> deletedFriendships = friendshipService.deleteFriendship(firstEmail, secondUser);
    	return new ResponseEntity<Collection<Friendship>>(deletedFriendships, HttpStatus.OK);
    }
    

}
