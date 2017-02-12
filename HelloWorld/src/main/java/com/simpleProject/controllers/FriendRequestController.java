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
import com.simpleProject.model.Korisnik;
import com.simpleProject.services.FriendRequestService;

@RestController
public class FriendRequestController {
	
	
	@Autowired
    private FriendRequestService friendRequestService;
    
    @RequestMapping(
            value    = "/api/friendRequests/sendRequest",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<FriendRequest> sendRequest(@RequestBody FriendRequest friendRequest) {
        FriendRequest sentFriendRequest = friendRequestService.sendRequest(friendRequest);
        return new ResponseEntity<FriendRequest>(sentFriendRequest, HttpStatus.OK);
    }
    
    @RequestMapping(
    		value = "api/friendRequests/getRequests/{email:.+}",
    		method = RequestMethod.GET,
    		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Collection<FriendRequest>> getRequests(@PathVariable String email){
    	Collection<FriendRequest> requests = friendRequestService.getAllFriendRequests(email);
    	return new ResponseEntity<Collection<FriendRequest>>(requests, HttpStatus.OK);
    }
    

}
