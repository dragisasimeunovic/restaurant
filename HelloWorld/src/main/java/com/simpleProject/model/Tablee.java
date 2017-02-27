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
@Table(name = "tablee")
public class Tablee implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private Integer id;
	
	@Column(name = "number")
    private String number;
	
	@Column(name = "positionLeft")
    private Integer positionLeft;
	
	@Column(name = "positionTop")
    private Integer positionTop;
	
	@Column(name = "idRestaurant")
    private Integer idRestaurant;
	
	@Column(name = "reon")
    private String reon;
	
	@ManyToOne 
	private Restaurant restaurant;
	
	
	public Tablee() {
		// TODO Auto-generated constructor stub
	}
	


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}


	public Integer getIdRestaurant() {
		return idRestaurant;
	}

	public void setIdRestaurant(Integer idRestaurant) {
		this.idRestaurant = idRestaurant;
	}

	public String getReon() {
		return reon;
	}

	public void setReon(String reon) {
		this.reon = reon;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}
	
	@JsonIgnore
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}



	public Integer getPositionLeft() {
		return positionLeft;
	}



	public void setPositionLeft(Integer positionLeft) {
		this.positionLeft = positionLeft;
	}



	public Integer getPositionTop() {
		return positionTop;
	}



	public void setPositionTop(Integer positionTop) {
		this.positionTop = positionTop;
	}
	
	

}
