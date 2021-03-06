package com.simpleProject.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "friendRequest")
public class FriendRequest implements Serializable{

	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@ManyToOne
    private Korisnik userSender;
	
	@Column(name = "userSenderEmaill")
	private String userSenderEmaill;
	

	@Column(name = "userRecieverEmail")
	private String userRecieverEmail;
	
	public FriendRequest() {
		
	}
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Korisnik getUserSender() {
		return userSender;
	}

	
	public void setUserSender(Korisnik userSender) {
		this.userSender = userSender;
	}

	public String getUserRecieverEmail() {
		return userRecieverEmail;
	}

	public void setUserRecieverEmail(String userRecieverEmail) {
		this.userRecieverEmail = userRecieverEmail;
	}
	
	public String getUserSenderEmaill() {
		return userSenderEmaill;
	}


	public void setUserSenderEmaill(String userSenderEmaill) {
		this.userSenderEmaill = userSenderEmaill;
	}
	
	
	
	
}
