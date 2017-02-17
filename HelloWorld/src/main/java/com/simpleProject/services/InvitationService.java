package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.Invitation;
import com.simpleProject.repository.InvitationRepository;

@Service
public class InvitationService {

	@Autowired
	InvitationRepository invitationRepository;
	
	public Collection<Invitation> getAll(){
		return invitationRepository.findAll();
	}

	
	public Invitation addInvitation(Invitation invitation){
		return invitationRepository.save(invitation);
	}
	
	
}
