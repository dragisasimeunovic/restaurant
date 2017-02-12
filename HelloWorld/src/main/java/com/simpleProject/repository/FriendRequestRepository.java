package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.FriendRequest;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Integer>{

	public Collection<FriendRequest> findByUserRecieverEmail(String userRecieverEmail);
	
}
