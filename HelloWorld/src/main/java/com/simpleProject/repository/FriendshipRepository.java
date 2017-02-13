package com.simpleProject.repository;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Friendship;
import com.simpleProject.model.Korisnik;

public interface FriendshipRepository extends JpaRepository<Friendship, Integer>{

	public Collection<Friendship> findByFirstUserEmail(String firstUserEmail);
	public Collection<Friendship> findByFirstUserEmailAndSecondUserFS(String firstUserEmail, Korisnik secondUserFS);
	
	@Transactional
	public Collection<Friendship> deleteByFirstUserEmailAndSecondUserFS(String firstUserEmail, Korisnik secondUserFS);

	
}
