package com.simpleProject.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simpleProject.model.Friendship;
import com.simpleProject.model.Korisnik;
import com.simpleProject.repository.FriendshipRepository;
import com.simpleProject.repository.KorisnikRepository;

@Service
public class FriendshipService {
	
	@Autowired
	FriendshipRepository friendshipRepository;
	
	@Autowired
	KorisnikRepository korisnikRepository;
	
	public Friendship sendFS(Friendship friendship) {
		
		Friendship friendship2 = new Friendship();
		friendship2.setFirstUserEmail(friendship.getSecondUserFS().getEmail());
		Korisnik firstUser = korisnikRepository.getOne(friendship.getFirstUserEmail());
		friendship2.setSecondUserFS(firstUser);
		
		friendshipRepository.save(friendship2);
			
		return friendshipRepository.save(friendship);
	}

	public Collection<Friendship> getAllFriends(String firstUserEmail) {
		return friendshipRepository.findByFirstUserEmail(firstUserEmail);
	}

}
