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
@Table(name = "offer")
public class Offer implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@Column(name = "price")
    private Integer price;
	
	@Column(name = "deliveryDate")
    private String deliveryDate;
	
	@ManyToOne
    private Korisnik bidder;
	
	@ManyToOne
	private GroceriesList gl;
	
	@Column(name = "warranty")
    private boolean warranty;
	
	@Column(name = "accepted")
    private boolean accepted;
	
	public Offer() {
		// TODO Auto-generated constructor stub
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public Korisnik getBidder() {
		return bidder;
	}

	public void setBidder(Korisnik bidder) {
		this.bidder = bidder;
	}

	public GroceriesList getGl() {
		return gl;
	}
	
	@JsonIgnore
	public void setGl(GroceriesList gl) {
		this.gl = gl;
	}

	public boolean isWarranty() {
		return warranty;
	}

	public void setWarranty(boolean warranty) {
		this.warranty = warranty;
	}

	public boolean isAccepted() {
		return accepted;
	}

	public void setAccepted(boolean accepted) {
		this.accepted = accepted;
	}
	
	
	
	

}
