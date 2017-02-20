package com.simpleProject.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simpleProject.model.Korisnik;

public interface KorisnikRepository extends JpaRepository<Korisnik, String> {

	public Collection<Korisnik> findByTip(String type);
	public Collection<Korisnik> findByTipAndImeAndPrezimeAndEmailNot(String type, String name, String surname, String email);
	public Collection<Korisnik> findByTipAndEmailNotOrderByImeAsc(String type, String email);
	public Collection<Korisnik> findByTipAndEmailNotOrderByImeDesc(String type, String email);
	public Collection<Korisnik> findByTipAndEmailNot(String type, String email);
	public Collection<Korisnik> findByTipOrTipOrTip(String string, String string2, String string3);

}
