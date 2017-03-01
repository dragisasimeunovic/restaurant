package com.simpleProject.services;

import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;

import com.simpleProject.WebAppInitializer;
import com.simpleProject.model.Korisnik;

@SuppressWarnings("deprecation")
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WebAppInitializer.class)
@WebIntegrationTest
@TestPropertySource(locations = "classpath:test.properties")
public class KorisnikServiceTest {
	
	@Autowired
	KorisnikService korisnikService;

	@Test
	public void findByCompanyId() {
		Collection<Korisnik> korisnici = korisnikService.getAll();
		
		assertThat(korisnici).isNotNull();
		assertThat(korisnici).hasSize(2);
	}
	
	@Test
	public void findByEmail() {
		Korisnik korisnik = korisnikService.getOne("e1@gmail.com");
		assertThat(korisnik).isNotNull();

		assertThat(korisnik.getEmail()).isEqualTo("e1@gmail.com");
		assertThat(korisnik.getLozinka()).isEqualTo("123");
		assertThat(korisnik.getIme()).isEqualTo("Dragisa");
		assertThat(korisnik.getPrezime()).isEqualTo("Simeunovic");
		
		assertTrue(korisnik.getActivated());
	}
	
	@Test
	@Transactional
	@Rollback(true)
	public void save() {
		Korisnik user = new Korisnik();
		user.setEmail("e3@gmail.com");
		user.setLozinka("123456");
		user.setIme("Kaca");
		user.setPrezime("Kaca");

		int dbSizeBeforeAdd = korisnikService.getAll().size();

		Korisnik dbUser = korisnikService.add(user);
		assertThat(dbUser).isNotNull();

		// Validate that new user is in the database
		List<Korisnik> users = (List<Korisnik>) korisnikService.getAll();
		
		assertThat(users).hasSize(dbSizeBeforeAdd + 1);
		dbUser = users.get(users.size() - 1); // get last student
		
		assertThat(dbUser.getEmail()).isEqualTo("e3@gmail.com");
		assertThat(dbUser.getLozinka()).isEqualTo("123456");
		assertThat(dbUser.getIme()).isEqualTo("Kaca");
		assertThat(dbUser.getPrezime()).isEqualTo("Kaca");

	}

}
