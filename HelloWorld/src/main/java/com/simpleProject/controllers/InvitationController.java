package com.simpleProject.controllers;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simpleProject.MailSending;
import com.simpleProject.model.Invitation;
import com.simpleProject.model.Reservation;
import com.simpleProject.model.Tablee;
import com.simpleProject.services.InvitationService;
import com.simpleProject.services.ReservationService;
import com.simpleProject.services.TableeService;

@RestController
public class InvitationController {

	
	@Autowired
	private InvitationService invitationService;
	
	@Autowired
	private ReservationService reservationService;
	
	@Autowired
	private TableeService tableeService;
	
	
	@RequestMapping(
            value    = "/api/invitation/addInvitation",
            method   = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Invitation> addInvitation(@RequestBody Invitation invitation) throws MessagingException {
		Invitation inv = invitationService.addInvitation(invitation);
		Reservation r = reservationService.getReservationById(inv.getReservationId());
		Tablee t = tableeService.getTableeById(r.getReservedTable().getId());
		MailSending.sendMail("feddelegrand17@gmail.com", "Invitation", "http://localhost:8099/#/invitationAccept/?idReservation="+inv.getReservationId()+"?startTime="+r.getComingTime()+"?idRestaurant="+r.getRestaurantId()+"?tableNumber="+r.getReservedTable().getNumber()+"?recieverId="+inv.getRecieverId());
        return new ResponseEntity<Invitation>(inv, HttpStatus.OK);
    }
	
}
