package com.simpleProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.model.Invitation;
import com.simpleProject.services.InvitationService;

@RestController
public class InvitationController {

	
	@Autowired
	private InvitationService invitationService;
	
	
	@RequestMapping(
            value    = "/api/invitation/addInvitation",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Invitation> addInvitation(@RequestBody Invitation invitation) {
		Invitation savedInvitation = invitationService.addInvitation(invitation);
        return new ResponseEntity<Invitation>(savedInvitation, HttpStatus.OK);
    }
	
}
