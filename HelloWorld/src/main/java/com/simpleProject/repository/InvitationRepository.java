package com.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Invitation;

public interface InvitationRepository extends JpaRepository<Invitation, Integer>{

}
