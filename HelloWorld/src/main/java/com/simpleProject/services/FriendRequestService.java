package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.FriendRequest;
import com.simpleProject.repository.FriendRequestRepository;

@Service
public class FriendRequestService {
	
	@Autowired
	FriendRequestRepository friendRequestRepository;
	
	public Collection<FriendRequest> getAllFriendRequests(String email){
		return friendRequestRepository.findByUserRecieverEmail(email);
	}

	public FriendRequest sendRequest(FriendRequest friendRequest) {
		return friendRequestRepository.save(friendRequest);
	}
	
	public FriendRequest getRequest(String userRecieverEmail, String userSenderEmaill){
		return friendRequestRepository.findByUserRecieverEmailAndUserSenderEmaill(userRecieverEmail, userSenderEmaill);
	}
	
	public Collection<FriendRequest> deleteRequest(String userRecieverEmail, String userSenderEmaill) {
		return friendRequestRepository.deleteByUserRecieverEmailAndUserSenderEmaill(userRecieverEmail, userSenderEmaill);
	}

	public Integer deleteRequest(Integer requestId) {
		return friendRequestRepository.deleteById(requestId);
	}

}
