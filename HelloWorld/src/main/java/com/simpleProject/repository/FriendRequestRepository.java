package com.simpleProject.repository;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.FriendRequest;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Integer>{

	public Collection<FriendRequest> findByUserRecieverEmail(String userRecieverEmail);
	public FriendRequest findByUserRecieverEmailAndUserSenderEmaill(String userRecieverEmail, String userSenderEmaill);

	@Transactional
	public Collection<FriendRequest> deleteByUserRecieverEmailAndUserSenderEmaill(String userRecieverEmail, String userSenderEmaill);
	
	@Transactional
	public Integer deleteById(Integer id);
	
}
