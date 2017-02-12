package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Friendship;

public interface FriendshipRepository extends JpaRepository<Friendship, Integer>{

	public Collection<Friendship> findByFirstUserEmail(String firstUserEmail);
	
}
