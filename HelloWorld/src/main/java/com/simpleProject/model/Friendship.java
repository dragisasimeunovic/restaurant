package com.simpleProject.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "friendship")
public class Friendship implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@Column(name="firstUserEmail")
	private String firstUserEmail;
	
	@ManyToOne
	private Korisnik secondUserFS;
	
	
	public Friendship() {

	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getFirstUserEmail() {
		return firstUserEmail;
	}


	public void setFirstUserEmail(String firstUserEmail) {
		this.firstUserEmail = firstUserEmail;
	}


	public Korisnik getSecondUserFS() {
		return secondUserFS;
	}

	
	public void setSecondUserFS(Korisnik secondUserFS) {
		this.secondUserFS = secondUserFS;
	}
	
	
	
	

}
